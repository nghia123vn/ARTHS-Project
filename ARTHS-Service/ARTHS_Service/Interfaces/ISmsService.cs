﻿namespace ARTHS_Service.Interfaces
{
    public interface ISmsService
    {
        Task<bool> SendSmsAsync(string toPhoneNumber, string otp);
    }
}
