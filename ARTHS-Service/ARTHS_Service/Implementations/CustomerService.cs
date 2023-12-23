using ARTHS_Data;
using ARTHS_Data.Entities;
using ARTHS_Data.Models.Requests.Post;
using ARTHS_Data.Models.Requests.Put;
using ARTHS_Data.Models.Views;
using ARTHS_Data.Repositories.Interfaces;
using ARTHS_Service.Interfaces;
using ARTHS_Utility.Constants;
using ARTHS_Utility.Exceptions;
using ARTHS_Utility.Helpers;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace ARTHS_Service.Implementations
{
    public class CustomerService : BaseService, ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly ICartRepository _cartRepository;

        private readonly IAccountService _accountService;
        private readonly ICloudStorageService _cloudStorageService;
        private readonly ISmsService _smsService;


        public CustomerService(IUnitOfWork unitOfWork, IMapper mapper, ICloudStorageService cloudStorageService, IAccountService accountService, ISmsService smsService) : base(unitOfWork, mapper)
        {
            _customerRepository = unitOfWork.Customer;
            _cartRepository = unitOfWork.Cart;
            _cloudStorageService = cloudStorageService;
            _accountService = accountService;
            _smsService = smsService;
        }


        public async Task<CustomerViewModel> GetCustomer(Guid id)
        {
            return await _customerRepository.GetMany(customer => customer.AccountId.Equals(id))
                .ProjectTo<CustomerViewModel>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync() ?? throw new NotFoundException("Không tìm thấy customer.");
        }


        public async Task<CustomerViewModel> CreateCustomer(RegisterCustomerModel model)
        {
            var result = 0;
            var accountId = Guid.Empty;
            var otp = GenerateOtp();
            using (var transaction = _unitOfWork.Transaction())
            {
                try
                {
                    //create account
                    accountId = await _accountService.CreateAccount(model.PhoneNumber, model.Password, UserRole.Customer);
                    
                    //create customer
                    var customer = new CustomerAccount
                    {
                        AccountId = accountId,
                        FullName = model.FullName,
                        Gender = model.Gender,
                        Address = model.Address,
                        Otp = otp,
                    };
                    _customerRepository.Add(customer);

                    //create cart
                    var cart = new Cart
                    {
                        Id = Guid.NewGuid(),
                        CustomerId = accountId,
                    };
                    _cartRepository.Add(cart);

                    result = await _unitOfWork.SaveChanges();
                    await _smsService.SendSmsAsync(model.PhoneNumber, otp);
                    transaction.Commit();
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    throw;
                }
            };
            
            return result > 0 ? await GetCustomer(accountId) : null!;
        }

        public async Task<CustomerViewModel> ActiveCustomer(ActivateCustomerModel model)
        {
            var customer = await _customerRepository.GetMany(customer => customer.Account.PhoneNumber.Equals(model.PhoneNumber) && customer.Account.Status.Equals(UserStatus.Pending))
                                                .Include(customer => customer.Account)
                                                .FirstOrDefaultAsync() ?? throw new NotFoundException("Không tìm thấy customer");
            if (!customer.Otp!.Equals(model.Otp))
            {
                throw new BadRequestException("Mã OTP không chính sát.");
            }

            customer.Account.Status = UserStatus.Active;
            
            _customerRepository.Update(customer);
            var result = await _unitOfWork.SaveChanges();
            return result > 0 ? await GetCustomer(customer.AccountId) : null!;
        }

        public async Task<CustomerViewModel> UpdateCustomer(Guid id, UpdateCustomerModel model)
        {
            var customer = await _customerRepository.GetMany(customer => customer.AccountId.Equals(id))
                                                .Include(customer => customer.Account)
                                                .FirstOrDefaultAsync();
            if (customer != null)
            {
                customer.FullName = model.FullName ?? customer.FullName;
                customer.Gender = model.Gender ?? customer.Gender;
                customer.Address = model.Address ?? customer.Address;
                customer.Account.Status = model.Status ?? customer.Account.Status;

                if (!string.IsNullOrEmpty(model.OldPassword))
                {
                    if (!PasswordHasher.VerifyPassword(model.OldPassword, customer.Account.PasswordHash))
                    {
                        throw new InvalidOldPasswordException("Mật khẩu cũ không chính sát.");
                    }
                    if (model.NewPassword != null)
                    {
                        customer.Account.PasswordHash = PasswordHasher.HashPassword(model.NewPassword);
                    }
                }
                _customerRepository.Update(customer);
            }
            else
            {
                throw new NotFoundException("Không tìm thấy customer");
            }
            var result = await _unitOfWork.SaveChanges();
            return result > 0 ? await GetCustomer(customer.AccountId) : null!;
        }


        public async Task<CustomerViewModel> UploadAvatar(Guid id, IFormFile image)
        {
            var customer = await _customerRepository.GetMany(customer => customer.AccountId.Equals(id)).FirstOrDefaultAsync();
            if (customer != null)
            {
                //xóa hình cũ trong firebase
                if (!string.IsNullOrEmpty(customer.Avatar))
                {
                    await _cloudStorageService.Delete(id);
                }

                //upload hình mới
                var url = await _cloudStorageService.Upload(id, image.ContentType, image.OpenReadStream());

                customer.Avatar = url;

                _customerRepository.Update(customer);
            }
            var result = await _unitOfWork.SaveChanges();
            return result > 0 ? await GetCustomer(id) : null!;
        }


        private string GenerateOtp()
        {
            int otpLength = 6;
            string numbers = "0123456789";

            Random random = new Random();
            char[] otpArray = new char[otpLength];

            for (int i = 0; i < otpLength; i++)
            {
                otpArray[i] = numbers[random.Next(numbers.Length)];
            }

            string otp = new(otpArray);

            return otp;
        }
    }
}
