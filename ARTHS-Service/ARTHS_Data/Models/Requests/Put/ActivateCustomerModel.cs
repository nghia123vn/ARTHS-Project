namespace ARTHS_Data.Models.Requests.Put
{
    public class ActivateCustomerModel
    {
        public string PhoneNumber { get; set; } = null!;
        public string Otp { get; set; } = null!;

    }
}
