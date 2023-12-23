using ARTHS_Data;
using ARTHS_Data.Entities;
using ARTHS_Data.Models.Requests.Filters;
using ARTHS_Data.Models.Requests.Get;
using ARTHS_Data.Models.Requests.Post;
using ARTHS_Data.Models.Views;
using ARTHS_Data.Repositories.Interfaces;
using ARTHS_Service.Interfaces;
using ARTHS_Utility.Enums;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace ARTHS_Service.Implementations
{
    public class MaintenanceScheduleService : BaseService, IMaintenanceScheduleSerivce
    {
        private readonly IMaintenanceScheduleRepository _maintenanceScheduleRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly INotificationService _notificationService;
        public MaintenanceScheduleService(IUnitOfWork unitOfWork, IMapper mapper, INotificationService notificationService) : base(unitOfWork, mapper)
        {
            _maintenanceScheduleRepository = unitOfWork.MaintenanceSchedule;
            _orderDetailRepository = unitOfWork.OrderDetail;
            _notificationService = notificationService;
        }

        public async Task<ListViewModel<MaintenanceScheduleViewModel>> GetMainTenanceSchedules(MaintenanceScheduleFilterModel filter, PaginationRequestModel pagination)
        {
            var query = _maintenanceScheduleRepository.GetAll().AsQueryable();
            if (filter.CustomerId.HasValue)
            {
                query = query.Where(m => m.CustomerId.Equals(filter.CustomerId.Value));
            }
            if (filter.OrderDetailId.HasValue)
            {
                query = query.Where(m => m.OrderDetailId.Equals(filter.OrderDetailId.Value));
            }
            if(filter.FromDate.HasValue && filter.ToDate.HasValue && filter.FromDate.Value.Date < filter.ToDate.Value.Date)
            {
                query = query.Where(m => m.NextMaintenanceDate.Date >= filter.FromDate.Value.Date && m.NextMaintenanceDate.Date <= filter.ToDate.Value.Date);
            }
            var totalRow = await query.AsNoTracking().CountAsync();
            var paginatedQuery = query
               .Skip(pagination.PageNumber * pagination.PageSize)
               .Take(pagination.PageSize);
            var schedules = await paginatedQuery
                .ProjectTo<MaintenanceScheduleViewModel>(_mapper.ConfigurationProvider)
                .OrderBy(m => m.NextMaintenanceDate)
                .AsNoTracking()
                .ToListAsync();
            return new ListViewModel<MaintenanceScheduleViewModel>
            {
                Pagination = new PaginationViewModel
                {
                    PageNumber = pagination.PageNumber,
                    PageSize = pagination.PageSize,
                    TotalRow = totalRow
                },
                Data = schedules
            };
        }

        public async Task<bool> SendMaintenanceReminders(Guid maintenanceScheduleId)
        {
            var maintenanceSchedules = await _maintenanceScheduleRepository
                .GetMany(m => m.Id.Equals(maintenanceScheduleId) && !m.RemiderSend)
                .FirstOrDefaultAsync();

            if (maintenanceSchedules == null) return false;

            
                await SendNotificationToCustomer(maintenanceSchedules);
                maintenanceSchedules.RemiderSend = true;
            

            _maintenanceScheduleRepository.Update(maintenanceSchedules);
            return await _unitOfWork.SaveChanges() > 0 ? true : false;
        }

        private async Task SendNotificationToCustomer(MaintenanceSchedule schedule)
        {
            var detail = await _orderDetailRepository.GetMany(detail => detail.Id.Equals(schedule.OrderDetailId))
                .Include(detail => detail.RepairService)
                .FirstOrDefaultAsync();

            var message = new CreateNotificationModel
            {
                Title = $"Nhắc nhở sắp đến lịch bảo trì tiếp theo.",
                Body = $"Bạn đã sử dụng dịch vụ bảo trì bảo dưỡng '{detail!.RepairService!.Name}' " +
                $"bên chúng tôi và đã sắp đến hạn bảo dưỡng lần tiếp theo vào ngày {schedule.NextMaintenanceDate.ToString("dd-MM-yyyy")}. " +
                $"Để đảm bảo được tình trạng xe tốt nhất bạn nên đặt lịch sửa bảo trì lần tiếp theo hoặc có thể đem xe đến để chúng tôi có thể chăm sóc tốt cho xe của bạn.",
                Data = new NotificationDataViewModel
                {
                    CreateAt = DateTime.UtcNow.AddHours(7),
                    Type = NotificationType.MaintanenceSchedule.ToString(),
                    Link = detail.Id.ToString()
                }
            };
            //var staffId = await _accountRepository.GetMany(account => account.Id.Equals(order.StaffId)).Select(account => account.Id).FirstOrDefaultAsync();
            await _notificationService.SendNotification(new List<Guid> { schedule.CustomerId }, message);
        }
    }
}
