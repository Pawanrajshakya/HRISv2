using AutoMapper.QueryableExtensions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IEmployeeBehaviorRepository
    {
        public Task<List<EmployeeBehaviorDto>> GetCodesAsync(string userid);
        public Task<List<EmployeeBehaviorChartDto>> GetChartAsync(
            string userID,
            string startDate,
            string endDate,
            string requestStatus,
            string jobCenters,
            string foodCenters,
            string facilities,
            bool monthView,
            string yearMonth);
    }

    public class EmployeeBehaviorRepository : Repository, IEmployeeBehaviorRepository
    {
        public EmployeeBehaviorRepository(HRISDataContext context, AutoMapper.IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<EmployeeBehaviorDto>> GetCodesAsync(string userid)
        {
            try
            {
                var param = new SqlParameter("@UserID", userid);

                var data = _context.EmployeeBehaviors
                    .FromSqlRaw("dbo.sp_GetHRAEmployeeBehaviorList @UserID", param)
                    .ProjectTo<EmployeeBehaviorDto>(_mapper.ConfigurationProvider)
                    .ToList();

                return await Task.Run(() => data);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<EmployeeBehaviorChartDto>> GetChartAsync(string userID, string startDate, string endDate,
            string requestStatus, string jobCenters, string foodCenters, string facilities,
            bool monthView, string yearMonth)
        {
            try
            {
                var dtos = new List<EmployeeBehaviorChartDto>();

                SqlParameter[] sqlParameters = new SqlParameter[] {
                    new SqlParameter("@userID", userID??""),
                    new SqlParameter("@StartDate", startDate??""),
                    new SqlParameter("@EndDate", endDate??""),
                    new SqlParameter("@RequestStatus", requestStatus??""),
                    new SqlParameter("@JobCenters", jobCenters??""),
                    new SqlParameter("@FoodCenters", foodCenters??""),
                    new SqlParameter("@HRAFacilities", facilities??""),
                    new SqlParameter("@MonthView", monthView),
                    new SqlParameter("@YearMonth", yearMonth??"") { }
                };
                var data = _context.EmployeeBehaviorCharts
                    .FromSqlRaw("dbo.sp_GetHRAEmployeeBehaviorChartDataV2 @UserID, @StartDate, @EndDate, @RequestStatus," +
                    "@JobCenters, @FoodCenters, @HRAFacilities, @MonthView, @YearMonth", sqlParameters)
                    .ToList();

                foreach (var row in data)
                {
                    dtos.Add(_mapper.Map<EmployeeBehaviorChartDto>(row));
                }
                return await Task.Run(() => dtos); ;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
    }
}
