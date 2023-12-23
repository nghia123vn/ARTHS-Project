using ARTHS_Data;
using ARTHS_Data.Entities;
using ARTHS_Data.Models.Requests.Filters;
using ARTHS_Data.Models.Requests.Get;
using ARTHS_Data.Models.Requests.Post;
using ARTHS_Data.Models.Requests.Put;
using ARTHS_Data.Models.Views;
using ARTHS_Data.Repositories.Interfaces;
using ARTHS_Service.Interfaces;
using ARTHS_Utility.Constants;
using ARTHS_Utility.Enums;
using ARTHS_Utility.Exceptions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace ARTHS_Service.Implementations
{
    public class BookingService : BaseService, IBookingService
    {
        private readonly IRepairBookingRepository _repairBookingRepository;
        private readonly INotificationService _notificationService;
        private readonly IConfigurationService _configurationService;


        public BookingService(IUnitOfWork unitOfWork, IMapper mapper, IConfigurationService configurationService, INotificationService notificationService) : base(unitOfWork, mapper)
        {
            _repairBookingRepository = unitOfWork.RepairBooking;
            _configurationService = configurationService;
            _notificationService = notificationService;
        }

        public async Task<ListViewModel<RepairBookingViewModel>> GetRepairBookings(BookingFilterModel filter, PaginationRequestModel pagination)
        {
            var query = _repairBookingRepository.GetAll();

            if (filter.CustomerId.HasValue)
            {
                query = query.Where(booking => booking.CustomerId.Equals(filter.CustomerId.Value));
            }
            if (filter.StaffId.HasValue)
            {
                query = query.Where(booking => booking.StaffId.Equals(filter.StaffId.Value));

            }
            if (!string.IsNullOrEmpty(filter.PhoneNumber))
            {
                query = query.Include(booking => booking.Customer).ThenInclude(customer => customer.Account).Where(booking => booking.Customer.Account.PhoneNumber.Contains(filter.PhoneNumber));
            }
            if (!string.IsNullOrEmpty(filter.BookingDate))
            {
                DateTime dateBook;
                if (!DateTime.TryParseExact(filter.BookingDate, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out dateBook))
                {
                    throw new ConflictException("Vui lòng nhập đúng định dạng ngày (yyyy-MM-dd).");
                }
                query = query.Where(booking => booking.DateBook.Date.Equals(dateBook.Date));
            }
            if (!string.IsNullOrEmpty(filter.BookingStatus))
            {
                query = query.Where(booking => booking.Status.Equals(filter.BookingStatus));
            }
            if (!string.IsNullOrEmpty(filter.ExcludeBookingStatus))
            {
                query = query.Where(booking => !booking.Status.Equals(filter.ExcludeBookingStatus));
            }
            var listBooking = query
                .ProjectTo<RepairBookingViewModel>(_mapper.ConfigurationProvider)
                .OrderByDescending(booking => booking.DateBook);
            var bookings = await listBooking.Skip(pagination.PageNumber * pagination.PageSize).Take(pagination.PageSize).AsNoTracking().ToListAsync();
            var totalRow = await listBooking.AsNoTracking().CountAsync();
            if (bookings != null || bookings != null && bookings.Any())
            {
                return new ListViewModel<RepairBookingViewModel>
                {
                    Pagination = new PaginationViewModel
                    {
                        PageNumber = pagination.PageNumber,
                        PageSize = pagination.PageSize,
                        TotalRow = totalRow
                    },
                    Data = bookings
                };
            }
            return null!;
        }

        public async Task<RepairBookingViewModel> GetRepairBooking(Guid Id)
        {
            return await _repairBookingRepository.GetMany(booking => booking.Id.Equals(Id))
                .ProjectTo<RepairBookingViewModel>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync() ?? throw new NotFoundException("Không tìm thấy booking");
        }

        //public async Task<List<RepairBookingViewModel>> GetRepairBookingByCustomerId(Guid customerId)
        //{
        //    return await _repairBookingRepository.GetMany(booking => booking.CustomerId.Equals(customerId))
        //        .ProjectTo<RepairBookingViewModel>(_mapper.ConfigurationProvider)
        //        .OrderByDescending(booking => booking.DateBook)
        //        .ToListAsync();
        //}

        public async Task<RepairBookingViewModel> CreateBooking(Guid customerId, CreateRepairBookingModel model)
        {
            DateTime dateBook;
            if (!DateTime.TryParseExact(model.DateBook, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out dateBook))
            {
                throw new ConflictException("Vui lòng nhập đúng định dạng ngày (yyyy-MM-dd).");
            }

            await CheckCustomerBooking(customerId, dateBook);
            
            if (model.StaffId.HasValue)
            {
                if (!await IsStaffAvailableForBooking(model.StaffId.Value, dateBook))
                {
                    throw new ConflictException($"Nhân viên không còn lịch trống trong ngày {dateBook:dd-MM-yyyy}, quý khách vui lòng chọn ngày khác hoặc nhân viên khác.");
                }
            }
            if (!await IsBookingAvailableForDate(dateBook))
            {
                throw new ConflictException($"Ngày {dateBook:dd-MM-yyyy} cửa hàng không còn lịch trống, quý khách vui lòng chọn ngày khác");
            }

            var booking = new RepairBooking
            {
                Id = Guid.NewGuid(),
                CustomerId = customerId,
                DateBook = dateBook,
                Description = model.Description,
                Status = RepairBookingStatus.WaitForConfirm,
                OrderId = null,
                StaffId = model.StaffId,
                CreateAt = DateTime.UtcNow.AddHours(7)
            };
            _repairBookingRepository.Add(booking);
            var result = await _unitOfWork.SaveChanges();
            return result > 0 ? await GetRepairBooking(booking.Id) : null!;
        }

        private async Task CheckCustomerBooking(Guid customerId, DateTime dateBook)
        {
            var booking = await _repairBookingRepository.GetMany(booking =>
                                !booking.Status.Equals(RepairBookingStatus.Canceled) &&
                                booking.CustomerId.Equals(customerId) &&
                                booking.DateBook.Date.Equals(dateBook.Date))
                .FirstOrDefaultAsync();
            if (booking != null) throw new BadRequestException($"Bạn đã có lịch hẹn cho ngày {dateBook.ToString("dd-MM-yyyy")}.");
        }

        public async Task<RepairBookingViewModel> UpdateBooking(Guid repairBookingId, UpdateRepairBookingModel model)
        {
            var booking = await _repairBookingRepository.GetMany(booking => booking.Id.Equals(repairBookingId)).Include(booking => booking.Customer).FirstOrDefaultAsync() ?? throw new NotFoundException("Không tìm thấy thông tin booking.");
            if (model.Status == RepairBookingStatus.Canceled && string.IsNullOrEmpty(model.CancellationReason))
            {
                throw new BadRequestException("Cần phải cung cấp lý do khi hủy lịch đặt.");
            }

            if (model.Status != null && model.Status.Equals(RepairBookingStatus.Canceled))
            {
                booking.CancellationReason = model.CancellationReason;
                booking.CancellationDate = DateTime.UtcNow;
            }

            if (!string.IsNullOrEmpty(model.TimeBook))
            {
                DateTime dateBooking = booking.DateBook;
                if (!string.IsNullOrEmpty(model.DateBook))
                {
                    DateTime newDateBook;
                    if (!DateTime.TryParseExact(model.DateBook, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out newDateBook))
                    {
                        throw new ConflictException("Vui lòng nhập đúng định dạng ngày (yyyy-MM-dd).");
                    }
                    if (!newDateBook.Date.Equals(dateBooking.Date))
                    {
                        dateBooking = newDateBook;
                        if (!await IsBookingAvailableForDate(dateBooking))
                        {
                            throw new ConflictException($"Ngày {dateBooking:dd-MM-yyyy} cửa hàng không còn lịch trống, vui lòng chọn ngày khác.");
                        }
                    }
                }
                var timeBook = HandleTimeBooking(model.TimeBook);
                booking.DateBook = dateBooking.Date + timeBook;
            }

            //Update staff
            //if (model.StaffId.HasValue && !booking.StaffId.Equals(model.StaffId))
            //{
            //    if (!await IsStaffAvailableForBooking(model.StaffId, booking.DateBook))
            //    {
            //        throw new ConflictException($"Nhân viên không còn lịch trống trong ngày {booking.DateBook:dd-MM-yyyy}, quý khách vui lòng chọn ngày khác.");
            //    }
            //    booking.StaffId = model.StaffId;
            //}
            


            booking.Description = model.Description ?? booking.Description;
            booking.Status = model.Status ?? booking.Status;

            if (booking.Status.Equals(RepairBookingStatus.Confirmed))
            {
                if(booking.StaffId!= null)
                {
                    //if (!await IsStaffAvailableForBooking(booking.StaffId, booking.DateBook))
                    //{
                    //    throw new ConflictException($"Nhân viên không còn lịch trống trong ngày {booking.DateBook:dd-MM-yyyy}, quý khách vui lòng chọn ngày khác.");
                    //}
                    if(!await IsStaffAvailableForDate(booking.StaffId, booking.DateBook))
                    {
                        throw new ConflictException($"Nhân viên đã có lịch sửa chữa trong khoản thời gian từ {booking.DateBook.AddMinutes(-30):HH\\:mm} đến {booking.DateBook.AddMinutes(30):HH\\:mm}. Xin vui lòng chọn thời gian khác.");
                    }
                    await SendNotificationBookingToStaff(booking);
                }
            }
            _repairBookingRepository.Update(booking);
            var result = await _unitOfWork.SaveChanges();
            return result > 0 ? await GetRepairBooking(repairBookingId) : null!;
        }

        public async Task AutoCancelBooking()
        {
            var bookings = await _repairBookingRepository.GetMany(booking => booking.Status.Equals(RepairBookingStatus.Confirmed) && booking.DateBook.Date <= DateTime.UtcNow.AddHours(7).Date).ToListAsync();
            if(bookings.Count == 0)
            {
                return;
            }
            foreach( var booking in bookings)
            {
                booking.Status = RepairBookingStatus.Canceled;
                booking.CancellationReason = "Khách hàng không đến.";
                booking.CancellationDate = DateTime.UtcNow.AddHours(7);
                //_repairBookingRepository.Update( booking );
            }
            _repairBookingRepository.UpdateRange(bookings);
            await _unitOfWork.SaveChanges();
        }

        private async Task<bool> IsStaffAvailableForDate(Guid? staffId, DateTime dateBook)
        {
            var existBooking = await _repairBookingRepository.GetMany(booking => booking.StaffId.Equals(staffId) &&
                                                                                  booking.Status.Equals(RepairBookingStatus.Confirmed) &&
                                                                                  booking.DateBook < dateBook.AddMinutes(30) &&
                                                                                  booking.DateBook > dateBook.AddMinutes(-30)).ToListAsync();
            return existBooking.Count == 0;
        }

        private async Task<bool> IsStaffAvailableForBooking(Guid? staffId, DateTime dateBook)
        {
            var countBookingOfStaff = await _repairBookingRepository
                .GetMany(booking => booking.StaffId.Equals(staffId) && booking.DateBook.Date.Equals(dateBook.Date) && !booking.Status.Equals(RepairBookingStatus.Canceled))
                .CountAsync();
            if (countBookingOfStaff.Equals(await _configurationService.CalculateDailyStaffReceivedBookings()))
            {
                return false;
            }
            return true;
        }

        private async Task<bool> IsBookingAvailableForDate(DateTime dateBook)
        {
            var booking = await _repairBookingRepository.GetMany(booking => booking.DateBook.Date.Equals(dateBook.Date) && !booking.Status.Equals(RepairBookingStatus.Canceled)).ToListAsync();
            if (booking.Count >= await _configurationService.CalculateDailyOnlineBookings())
            {
                return false;
            }
            return true;
        }
        private TimeSpan HandleTimeBooking(string timeBook)
        {
            TimeSpan result;
            if (TimeSpan.TryParseExact(timeBook, "hh\\:mm", null, out result))
            {
                if (result >= TimeSpan.Parse("08:00") && result <= TimeSpan.Parse("15:00"))
                {
                    return result;
                }
                throw new ConflictException("Thời nhận sửa chữa của cửa hàng là từ 8h - 15h");
            }
            else
            {
                throw new ConflictException("Vui lòng nhập đúng định dạng thời gian (hh:mm)");
            }
        }

        private async Task SendNotificationBookingToStaff(RepairBooking booking)
        {
            var message = new CreateNotificationModel
            {
                Title = $"Bạn có lịch đặt sửa chữa vào ngày {booking.DateBook.ToString("dd-MM-yyyy")}.",
                Body = $"Khách hàng {booking.Customer.FullName} đã đặt bạn để sửa xe. Khách hàng dự kiến tới {booking.DateBook.ToString("dd-MM-yyyy")}. Vui lòng chú ý lịch đặt và tiếp đón khách hàng cẩn thận.",
                Data = new NotificationDataViewModel
                {
                    CreateAt = DateTime.UtcNow.AddHours(7),
                    Type = NotificationType.Booking.ToString(),
                    Link = booking.Id.ToString(),
                }
            };
            await _notificationService.SendNotification(new List<Guid> { (Guid)booking.StaffId! }, message);
        }

    }
}
