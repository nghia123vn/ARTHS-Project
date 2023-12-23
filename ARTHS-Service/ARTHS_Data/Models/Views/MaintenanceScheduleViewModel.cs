namespace ARTHS_Data.Models.Views
{
    public class MaintenanceScheduleViewModel
    {
        public Guid Id { get; set; }
        public DateTime NextMaintenanceDate { get; set; }
        public DateTime ReminderDate { get; set; }
        public bool RemiderSend { get; set; }

        public virtual BasicCustomerViewModel Customer { get; set; } = null!;
        public virtual OrderDetailViewModel OrderDetail { get; set; } = null!;
    }
}
