﻿namespace ARTHS_Data.Models.Requests.Put
{
    public class UpdateOwnerModel
    {
        public string? FullName { get; set; }
        public string? Gender { get; set; }
        public string? Status { get; set; }


        public string? OldPassword { get; set; }
        public string? NewPassword { get; set; }
    }
}
