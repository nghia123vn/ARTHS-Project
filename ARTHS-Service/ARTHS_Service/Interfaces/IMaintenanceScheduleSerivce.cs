using ARTHS_Data.Models.Requests.Filters;
using ARTHS_Data.Models.Requests.Get;
using ARTHS_Data.Models.Views;

namespace ARTHS_Service.Interfaces
{
    public interface IMaintenanceScheduleSerivce
    {
        Task<ListViewModel<MaintenanceScheduleViewModel>> GetMainTenanceSchedules(MaintenanceScheduleFilterModel filter, PaginationRequestModel pagination);
        Task<bool> SendMaintenanceReminders(Guid maintenanceScheduleId);
    }
}
