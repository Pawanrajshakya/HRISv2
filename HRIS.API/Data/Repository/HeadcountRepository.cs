using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IHeadcountRepository
    {
        public Task<List<AgencyHeadcountChartDto>> GetChartAsync
            (string userID, string rcs, string dps);
        public Task<List<HeadcountReportDto>> GetHeadcountReportAsync
            (string userID, string rcs, string dps, int pageNumber = 1, int pageSize = 10,
            string sortColumn = "Division_Unit", string sortOrder = "asc", string searchTerm = "");
        public Task<List<HeadcountTitleSummaryReportDto>> GetPagedHeadcountTitleSummaryReportAsync
            (string userID, string rcs, string titles, int pageNumber = 1, int pageSize = 10,
            string sortColumn = "RC", string sortOrder = "asc", string searchTerm = "");
        public Task<List<HeadcountTitleAndBudgetReconciliationSummaryReport>> GetPagedHeadcountTitleAndBudgetReconciliationSummaryReportAsync
            (string userID, string rcs, string titles, int pageNumber = 1, int pageSize = 10,
            string sortColumn = "RC", string sortOrder = "asc", string searchTerm = "");
        public Task<List<HeadcountTitleAndBudgetSummaryReport>> GetPagedHeadcountTitleAndBudgetSummaryReportAsync
            (string userID, string rcs, string titles, int pageNumber = 1, int pageSize = 10,
            string sortColumn = "RC", string sortOrder = "asc", string searchTerm = "");
        public Task<List<HeadcountPMSEmployeeDetailReport>> GetPagedHeadcountPMSEmployeeDetailReportsAsync
            (string userID, string rcs, string dps, string leaveStatus, string titles, int pageNumber = 1, int pageSize = 10,
            string sortColumn = "RC", string sortOrder = "asc", string searchTerm = "");
    }

    public class HeadcountRepository : Repository, IHeadcountRepository
    {

        public HeadcountRepository(HRISDataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<AgencyHeadcountChartDto>> GetChartAsync(string userID, string rcs, string dps)
        {
            List<AgencyHeadcountChartDto> dtos = new List<AgencyHeadcountChartDto>();

            SqlParameter[] sqlParameters =
                   new SqlParameter[] {
                        new SqlParameter("@UserID", userID) { },
                        new SqlParameter("@RCs", rcs){},
                        new SqlParameter("@DPs", dps){},
                   };

            var data = _context.AgencyHeadcountChart
                .FromSqlRaw($"EXECUTE dbo.[spGetAgencyHeadcountChart] @UserID, @RCs, @DPs", sqlParameters)
                .ToList();


            foreach (var item in data)
            {
                dtos.Add(_mapper.Map<AgencyHeadcountChartDto>(item));
            }

            return await Task.Run(() => dtos);
        }

        public async Task<List<HeadcountReportDto>> GetHeadcountReportAsync(string userID, string rcs, string dps, int pageNumber = 1, int pageSize = 10, string sortColumn = "Division_Unit", string sortOrder = "asc", string searchTerm = "")
        {
            List<HeadcountReportDto> dtos = new List<HeadcountReportDto>();

            SqlParameter[] sqlParameters =
                   new SqlParameter[] {
                        new SqlParameter("@UserID", userID) { },
                        new SqlParameter("@PageNumber", pageNumber){},
                        new SqlParameter("@PageSize", pageSize){},
                        new SqlParameter("@SortColumn", sortColumn){},
                        new SqlParameter("@SortOrder", sortOrder){},
                        new SqlParameter("@SearchTerm", searchTerm){},
                        new SqlParameter("@RCs", rcs){},
                        new SqlParameter("@DPs", dps){},
                   };


            var data = _context.HeadcountReports
                .FromSqlRaw($"EXECUTE dbo.[spGetPagedHeadCountReport] @UserID, @PageNumber, @PageSize, @SortColumn, @SortOrder, @SearchTerm, @RCs, @DPs", sqlParameters)
                .ToList();

            foreach (var item in data)
            {
                dtos.Add(_mapper.Map<HeadcountReportDto>(item));
            }

            return await Task.Run(() => dtos);
        }

        public async Task<List<HeadcountPMSEmployeeDetailReport>> GetPagedHeadcountPMSEmployeeDetailReportsAsync(string userID, string rcs, string dps, string leaveStatus, string titles, int pageNumber = 1, int pageSize = 10, string sortColumn = "RC", string sortOrder = "asc", string searchTerm = "")
        {
            List<HeadcountPMSEmployeeDetailReport> dtos = new List<HeadcountPMSEmployeeDetailReport>();

            SqlParameter[] sqlParameters =
                   new SqlParameter[] {
                        new SqlParameter("@UserID", userID) { },
                        new SqlParameter("@PageNumber", pageNumber){},
                        new SqlParameter("@PageSize", pageSize){},
                        new SqlParameter("@SortColumn", sortColumn){},
                        new SqlParameter("@SortOrder", sortOrder){},
                        new SqlParameter("@SearchTerm", searchTerm){},
                        new SqlParameter("@RCs", rcs){},
                        new SqlParameter("@DPs", dps){},
                        new SqlParameter("@LeaveStatus", leaveStatus){},
                        new SqlParameter("@Titles", titles){}
                   };


            var data = _context.HeadcountReports
                .FromSqlRaw($"EXECUTE dbo.[spGetPMSEmployeeDetailReportV2] @UserID, @PageNumber, @PageSize, @SortColumn, @SortOrder, @SearchTerm, @RCs, @DPs, @LeaveStatus, @Titles", sqlParameters)
                .ToList();


            foreach (var item in data)
            {
                dtos.Add(_mapper.Map<HeadcountPMSEmployeeDetailReport>(item));
            }

            return await Task.Run(() => dtos);
        }

        public async Task<List<HeadcountTitleAndBudgetReconciliationSummaryReport>> GetPagedHeadcountTitleAndBudgetReconciliationSummaryReportAsync(string userID, string rcs, string titles, int pageNumber = 1, int pageSize = 10, string sortColumn = "RC", string sortOrder = "asc", string searchTerm = "")
        {
            List<HeadcountTitleAndBudgetReconciliationSummaryReport> dtos = new List<HeadcountTitleAndBudgetReconciliationSummaryReport>();

            SqlParameter[] sqlParameters =
                   new SqlParameter[] {
                        new SqlParameter("@UserID", userID) { },
                        new SqlParameter("@PageNumber", pageNumber){},
                        new SqlParameter("@PageSize", pageSize){},
                        new SqlParameter("@SortColumn", sortColumn){},
                        new SqlParameter("@SortOrder", sortOrder){},
                        new SqlParameter("@SearchTerm", searchTerm){},
                        new SqlParameter("@RCs", rcs){},
                        new SqlParameter("@Titles", titles){}
                   };


            var data = _context.HeadCountTitleAndBudgetReconciliationSummaryReports
                .FromSqlRaw($"EXECUTE dbo.[spGetPagedHeadcountTitleAndBudgetSummaryReconciliationReportByRCAndTitleV2] @UserID, @PageNumber, @PageSize, @SortColumn, @SortOrder, @SearchTerm, @RCs, @Titles", sqlParameters)
                .ToList();


            foreach (var item in data)
            {
                dtos.Add(_mapper.Map<HeadcountTitleAndBudgetReconciliationSummaryReport>(item));
            }

            return await Task.Run(() => dtos);
        }

        public async Task<List<HeadcountTitleAndBudgetSummaryReport>> GetPagedHeadcountTitleAndBudgetSummaryReportAsync(string userID, string rcs, string titles, int pageNumber = 1, int pageSize = 10, string sortColumn = "RC", string sortOrder = "asc", string searchTerm = "")
        {
            List<HeadcountTitleAndBudgetSummaryReport> dtos = new List<HeadcountTitleAndBudgetSummaryReport>();

            SqlParameter[] sqlParameters =
                   new SqlParameter[] {
                        new SqlParameter("@UserID", userID) { },
                        new SqlParameter("@PageNumber", pageNumber){},
                        new SqlParameter("@PageSize", pageSize){},
                        new SqlParameter("@SortColumn", sortColumn){},
                        new SqlParameter("@SortOrder", sortOrder){},
                        new SqlParameter("@SearchTerm", searchTerm){},
                        new SqlParameter("@RCs", rcs){},
                        new SqlParameter("@Titles", titles){}
                   };


            var data = _context.HeadCountTitleAndBudgetSummaryReports
                .FromSqlRaw($"EXECUTE dbo.[SpGetPagedHeadCountTitleAndBudgetSummaryReportByrcandtitlev2] @UserID, @PageNumber, @PageSize, @SortColumn, @SortOrder, @SearchTerm, @RCs, @Titles", sqlParameters)
                .ToList();


            foreach (var item in data)
            {
                dtos.Add(_mapper.Map<HeadcountTitleAndBudgetSummaryReport>(item));
            }

            return await Task.Run(() => dtos);
        }

        public async Task<List<HeadcountTitleSummaryReportDto>> GetPagedHeadcountTitleSummaryReportAsync(string userID, string rcs, string titles, int pageNumber = 1, int pageSize = 10, string sortColumn = "Division_Unit", string sortOrder = "asc", string searchTerm = "")
        {
            List<HeadcountTitleSummaryReportDto> dtos = new List<HeadcountTitleSummaryReportDto>();

            SqlParameter[] sqlParameters =
                   new SqlParameter[] {
                        new SqlParameter("@UserID", userID) { },
                        new SqlParameter("@PageNumber", pageNumber){},
                        new SqlParameter("@PageSize", pageSize){},
                        new SqlParameter("@SortColumn", sortColumn){},
                        new SqlParameter("@SortOrder", sortOrder){},
                        new SqlParameter("@SearchTerm", searchTerm){},
                        new SqlParameter("@RCs", rcs){},
                        new SqlParameter("@Titles", titles){},
                   };


            var data = _context.HeadCountTitleSummaryReports
                .FromSqlRaw($"EXECUTE dbo.[spGetPagedHeadCountTitleSummaryReportV2] @UserID, @PageNumber, @PageSize, @SortColumn, @SortOrder, @SearchTerm, @RCs, @Titles", sqlParameters)
                .ToList();

            foreach (var item in data)
            {
                dtos.Add(_mapper.Map<HeadcountTitleSummaryReportDto>(item));
            }
            return await Task.Run(() => dtos);
        }
    }
}
