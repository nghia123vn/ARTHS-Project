namespace ARTHS_Data.Models.Requests.Filters
{
    public class MotobikeProductFilterModel
    {
        public string? Name { get; set; }
        public string? Category { get; set; }
        public string? VehiclesName { get; set; }
        public Guid? DiscountId { get; set; }
        public bool? HaveDiscount { get; set; }
        public string? Status { get; set; }
        public string? ExcludeStatus { get; set; }
        public bool? SortByNameAsc { get; set; }
        public bool? SortByPriceAsc { get; set; }

    }
}
