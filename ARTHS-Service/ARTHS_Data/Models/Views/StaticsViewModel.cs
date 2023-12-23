namespace ARTHS_Data.Models.Views
{
    public class StaticsViewModel
    {
        public DateTime TransactionDate { get; set; }
        public string OrderType { get; set; } = null!;
        public string IsOrder { get; set; } = null!;
        public int TotalAmount { get; set; }
    }
}
