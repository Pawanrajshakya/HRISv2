using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IOvertimeRepository
    {
        public Task<StaffOvertimeSummaryDto> GetStaffOvertimeSummaryAsync(string userid, string ein, string calenderType);
        public Task<IEnumerable<BudgetedOTDto>> GetBudgetedOvertimeAsync(string userid, string rcs, string year);
        public Task<IEnumerable<ActualOTDto>> GetActualOvertimeAsync(string userid, string rcs);
        public Task<IEnumerable<OvertimeReportDto>> GetOvertimeReportAsync(string userid, string rcs, string dps, string isCalender,
           int roleID, int pageNumber = 1, int pageSize = 10, string sortColumn = "", string sortOrder = "", string searchTerm = "");
        public Task<IEnumerable<OvertimeEarnedAnalysisReportDto>> GetOvertimeEarnedAnalysisReportAsync(string userid, string rcs, string year, bool isDateEarned,
           int pageNumber = 1, int pageSize = 10, string sortColumn = "", string sortOrder = "", string searchTerm = "");

        public Task<IEnumerable<HRISFiscalYearDto>> GetFiscalYears();
    }

    public class OvertimeRepository : IOvertimeRepository
    {

        private readonly OvertimeDataContext _context;
        private readonly IMapper _mapper;

        public OvertimeRepository(OvertimeDataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ActualOTDto>> GetActualOvertimeAsync(
            string userid, string rcs)
        {
            try
            {
                List<ActualOTDto> dtos = new List<ActualOTDto>();

                SqlParameter[] sqlParameters =
                    new SqlParameter[] {
                        new SqlParameter("@UserID", userid),
                        new SqlParameter("@RAList", rcs)
                    };

                var rows = _context.ActualOTs
                    .FromSqlRaw($"EXECUTE dbo.[spHRISGetOvertimeActualCurrent] @UserID, @RAList", sqlParameters)
                    .ToList();

                foreach (var row in rows)
                {
                    dtos.Add(_mapper.Map<ActualOTDto>(row));
                }
                return await Task.Run(() => dtos);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<BudgetedOTDto>> GetBudgetedOvertimeAsync(string userid, string rcs, string year)
        {
            try
            {
                List<BudgetedOTDto> dtos = new List<BudgetedOTDto>();

                SqlParameter[] sqlParameters =
                    new SqlParameter[] {
                        new SqlParameter("@UserID", userid),
                        new SqlParameter("@RAList", rcs),
                        new SqlParameter("@Year", year)
                    };

                var rows = _context.BudgetedOTs
                    .FromSqlRaw($"EXECUTE dbo.[spHRISGetOvertimeBudgetData] @UserID, @RAList, @Year", sqlParameters)
                    .ToList();

                foreach (var row in rows)
                {
                    dtos.Add(_mapper.Map<BudgetedOTDto>(row));
                }
                return await Task.Run(() => dtos);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        public async Task<StaffOvertimeSummaryDto> GetStaffOvertimeSummaryAsync(string userid, string ein, string calenderType)
        {
            try
            {
                List<StaffOvertimeSummaryDto> dtos = new List<StaffOvertimeSummaryDto>();

                SqlParameter[] sqlParameters =
                    new SqlParameter[] {
                        new SqlParameter("@UserID", userid),
                        new SqlParameter("@EIN", ein),
                        new SqlParameter("@IsCalendar", calenderType)
                    };

                var rows = _context.StaffOvertimeSummaries
                    .FromSqlRaw($"EXECUTE dbo.[spHRISReportOTSummaryByEIN] @UserID, @EIN, @IsCalendar", sqlParameters)
                    .ToList();

                foreach (var row in rows)
                {
                    dtos.Add(_mapper.Map<StaffOvertimeSummaryDto>(row));
                }
                if (dtos.Count == 0)
                    return new StaffOvertimeSummaryDto();

                return await Task.Run(() => dtos.SingleOrDefault());
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<OvertimeReportDto>> GetOvertimeReportAsync(string userid, string rcs, string dps, string isCalender,
            int roleID, int pageNumber = 1, int pageSize = 10, string sortColumn = "", string sortOrder = "", string searchTerm = "")
        {
            try
            {
                List<OvertimeReportDto> dtos = new List<OvertimeReportDto>();

                SqlParameter[] sqlParameters =
                    new SqlParameter[] {
                        new SqlParameter("@UserID", userid),
                        new SqlParameter("@PageNumber", pageNumber),
                        new SqlParameter("@PageSize", pageSize),
                        new SqlParameter("@SortColumn", sortColumn),
                        new SqlParameter("@SortOrder", sortOrder),
                        new SqlParameter("@SearchTerm", searchTerm),
                        new SqlParameter("@IsCalendar", isCalender),
                        new SqlParameter("@RCs", rcs),
                        new SqlParameter("@DPs", dps),
                        new SqlParameter("@RoleID", roleID)
                    };

                var rows = _context.OvertimeReports
                    .FromSqlRaw($"EXECUTE dbo.[spHRISReportOTSummary] @UserID, @PageNumber, @PageSize, @SortColumn, @SortOrder, @SearchTerm, @IsCalendar, @RCs, @DPs, @RoleID", sqlParameters)
                    .ToList();

                foreach (var row in rows)
                {
                    dtos.Add(_mapper.Map<OvertimeReportDto>(row));
                }
                return await Task.Run(() => dtos);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<OvertimeEarnedAnalysisReportDto>> GetOvertimeEarnedAnalysisReportAsync(string userid,
                                                                                                        string rcs,
                                                                                                        string year,
                                                                                                        bool isDateEarned,
                                                                                                        int pageNumber = 1,
                                                                                                        int pageSize = 10,
                                                                                                        string sortColumn = "",
                                                                                                        string sortOrder = "",
                                                                                                        string searchTerm = "")
        {
            try
            {
                List<OvertimeEarnedAnalysisReportDto> dtos = new List<OvertimeEarnedAnalysisReportDto>();

                SqlParameter[] sqlParameters =
                    new SqlParameter[] {
                        new SqlParameter("@UserID", userid),
                        new SqlParameter("@PageNumber", pageNumber),
                        new SqlParameter("@PageSize", pageSize),
                        new SqlParameter("@SortColumn", sortColumn),
                        new SqlParameter("@SortOrder", sortOrder),
                        new SqlParameter("@SearchTerm", searchTerm),
                        new SqlParameter("@RARC", rcs),
                        new SqlParameter("@CuDate", year),
                        new SqlParameter("@vPYear", year),
                        new SqlParameter("@vCYear", year),
                        new SqlParameter("@isDateEarned", isDateEarned ? "*" : "0"),
                    };

                var rows = _context.OvertimeEarnedAnalysisReports
                    .FromSqlRaw($"EXECUTE dbo.[spHRISGetOvertimeEarnedAnalysisReport] @UserID, @PageNumber, @PageSize, @SortColumn, @SortOrder, @SearchTerm, " +
                    $"@RARC, @CuDate, @vPYear, @vCYear, @isDateEarned", sqlParameters)
                    .ToList();

                foreach (var row in rows)
                {
                    dtos.Add(_mapper.Map<OvertimeEarnedAnalysisReportDto>(row));
                }
                return await Task.Run(() => dtos);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<HRISFiscalYearDto>> GetFiscalYears()
        {
            try
            {
                List<HRISFiscalYearDto> dtos = new List<HRISFiscalYearDto>();

                var rows = _context.HRISFiscalYears
                        .FromSqlRaw($"EXECUTE dbo.[spHRISGetFiscalYear]")
                        .ToList();
                foreach (var row in rows)
                {
                    dtos.Add(_mapper.Map<HRISFiscalYearDto>(row));
                }
                return await Task.Run(() => dtos);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
    }
}
