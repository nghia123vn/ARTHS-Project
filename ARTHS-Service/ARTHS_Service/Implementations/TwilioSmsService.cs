using ARTHS_Data;
using ARTHS_Service.Interfaces;
using ARTHS_Utility.Exceptions;
using ARTHS_Utility.Settings;
using AutoMapper;
using Microsoft.Extensions.Options;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace ARTHS_Service.Implementations
{
    public class TwilioSmsService : BaseService, ISmsService
    {
        private readonly AppSetting _appSettings;
        public TwilioSmsService(IUnitOfWork unitOfWork, IMapper mapper, IOptions<AppSetting> settings) : base(unitOfWork, mapper)
        {
            _appSettings = settings.Value;
        }
        public async Task<bool> SendSmsAsync(string toPhoneNumber, string otp)
        {
            try
            {
                var phoneNumber = int.Parse(toPhoneNumber);
                TwilioClient.Init(_appSettings.AccountSid, _appSettings.AuthToken);
                var message = await MessageResource.CreateAsync(
                   body: $"Mã OTP xác thực tài khoản cửa hàng Thanh Huy của bạn : {otp}",
                   from: new Twilio.Types.PhoneNumber(_appSettings.PhoneNumber),
                   to: new Twilio.Types.PhoneNumber("+84" + phoneNumber));

                return true;
            }catch (Exception)
            {
                throw new BadRequestException($"Số điện thoại {toPhoneNumber} không hợp lệ. " +
                    $"Vui lòng nhập chính sát số điện thoại.");
            }
            
        }
    }
}
