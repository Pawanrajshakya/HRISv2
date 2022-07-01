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
        public Task<List<EmployeeBehaviorDto>> GetAsync(string userid);
        public Task<List<EmployeeBehaviorChartDto>> GetChartAsync(
            string userid,
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

        public async Task<List<EmployeeBehaviorDto>> GetAsync(string userid)
        {
            var param = new SqlParameter("@UserID", userid);
            var data = _context.EmployeeBehaviors
                .FromSqlRaw("dbo.sp_GetHRAEmployeeBehaviorList @UserID", param)
                .ProjectTo<EmployeeBehaviorDto>(_mapper.ConfigurationProvider)
                .ToList();

            return await Task.Run(() => data);
        }

        public async Task<List<EmployeeBehaviorChartDto>> GetChartAsync(string userid, string startDate, string endDate,
            string requestStatus, string jobCenters, string foodCenters, string facilities,
            bool monthView, string yearMonth)
        {
            var useridParam = new SqlParameter("@UserID", userid);
            var startDateParam = new SqlParameter("@StartDate", startDate);
            var endDateParam = new SqlParameter("@EndDate", endDate);
            var requestStatusParam = new SqlParameter("@RequestStatus", requestStatus);
            var jobCentersParam = new SqlParameter("@JobCenters", jobCenters);
            var foodCentersParam = new SqlParameter("@FoodCenters", foodCenters);
            var facilitiesParam = new SqlParameter("@Facilities", facilities);
            var monthViewParam = new SqlParameter("@MonthView", monthView);
            var yearMonthParam = new SqlParameter("@YearMonth", yearMonth);

            var data = _context.Location
                .FromSqlRaw("dbo.sp_GetHRAEmployeeBehaviorChartData @UserID, @StartDate, @EndDate, @RequestStatus," +
                "@JobCenters, @FoodCenters, @HRAFacilities, @MonthView, @YearMonth",
                useridParam, startDateParam, endDateParam, requestStatusParam, jobCentersParam, foodCentersParam,
                facilitiesParam, monthViewParam, yearMonthParam)
                .ProjectTo<EmployeeBehaviorChartDto>(_mapper.ConfigurationProvider)
                .ToList();

            return await Task.Run(() => data);
        }
    }
}
