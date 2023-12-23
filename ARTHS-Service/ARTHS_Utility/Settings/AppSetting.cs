namespace ARTHS_Utility.Settings
{
    public class AppSetting
    {
        //secret key for authentication
        public string SecretKey { get; set; } = null!;
        public string RefreshTokenSecret { get; set; } = null!;

        // firebase cloud storage
        public string Bucket { get; set; } = null!;
        public string Folder { get; set; } = null!;

        //VNpay
        public string MerchantId { get; set; } = null!;
        public string MerchantPassword { get; set; } = null!;
        public string VNPayUrl { get; set; } = null!;
        public string ReturnUrl { get; set; } = null!;

        //Zalopay
        public int ZaloPayAppId { get; set; }
        public string ZaloPayKey1 { get; set; } = null!;
        public string ZaloPayKey2 { get; set; } = null!;
        public string CreateOrderUrl { get; set; } = null!;
        public string QueryOrderUrl { get; set; } = null!;
        public string CallbackUrl { get; set; } = null!;

        //twilio
        public string AccountSid { get; set; } = null!;
        public string AuthToken { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;

        //AzureStorage
        public string AccessKeyConnection { get; set; } = null!;
        public string ContainerName { get; set; } = null!;

    }
}
