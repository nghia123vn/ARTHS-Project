namespace ARTHS_Data.Models.Requests.Filters
{
    public class MaintenanceScheduleFilterModel
    {
        public Guid? CustomerId { get; set; }
        public Guid? OrderDetailId { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }
}
