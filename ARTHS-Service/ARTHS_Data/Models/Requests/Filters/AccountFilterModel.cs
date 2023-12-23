using System.ComponentModel;

namespace ARTHS_Data.Models.Requests.Filters
{
    public class AccountFilterModel
    {
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Status { get; set; }
        public string? ExcludeStatus { get; set; }
    }
}
