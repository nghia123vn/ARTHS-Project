using ARTHS_API.Configurations.Middleware;
using ARTHS_Data.Models.Requests.Filters;
using ARTHS_Data.Models.Requests.Get;
using ARTHS_Data.Models.Views;
using ARTHS_Service.Interfaces;
using ARTHS_Utility.Constants;
using Microsoft.AspNetCore.Mvc;

namespace ARTHS_API.Controllers
{
    [Route("api/maintanance-schedules")]
    [ApiController]
    public class MaintenanceSchedulesController : ControllerBase
    {
        private readonly IMaintenanceScheduleSerivce _maintenanceScheduleSerivce;

        public MaintenanceSchedulesController(IMaintenanceScheduleSerivce maintenanceScheduleSerivce)
        {
            _maintenanceScheduleSerivce = maintenanceScheduleSerivce;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ListViewModel<MaintenanceScheduleViewModel>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ListViewModel<MaintenanceScheduleViewModel>>> GetMaintanenceSchedules([FromQuery] MaintenanceScheduleFilterModel filter, [FromQuery] PaginationRequestModel pagination)
        {
            return await _maintenanceScheduleSerivce.GetMainTenanceSchedules(filter, pagination);
        }

        [HttpPost]
        [Authorize(UserRole.Teller)]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<ActionResult<string>> SendMaintenanceReminders([FromQuery] Guid maintenanceSheduleId)
        {
            var result = await _maintenanceScheduleSerivce.SendMaintenanceReminders(maintenanceSheduleId);
            if (result)
            {
                return "Send thành công";
            }
            else
            {
                return "Thất bại";
            }
        }
    }
}
