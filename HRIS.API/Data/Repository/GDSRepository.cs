using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IGDSRepository
    {
        public Task<IEnumerable<ECardChartDto>> GetChartAsync(int roleId, string rcs, string dps);

        //HRIS_ECards_ByRC
        public Task<IEnumerable<ECardSendAndReceivedReportDto>> GetSendAndReceivedReportAsync(string userID, int pageNumber = 1, int pageSize = 10, string sortColumn = "RC", string sortOrder = "asc",
            string searchTerm = null, string fromDate = null, string toDate = null, string rcs = null, bool ecardReportIsSentBy = true);

        //HRIS_ECards_ByRelationshipOfSender
        public Task<IEnumerable<ECardByRelationshipReportDto>> GetRelationshipReportAsync(string userID, int pageNumber = 1, int pageSize = 10, string sortColumn = "RC", string sortOrder = "asc",
            string searchTerm = null, string fromDate = null, string toDate = null, string rcs = null, bool ecardReportIsSentBy = true);

        //HRIS_ECards_ByExcellenceProgram
        public Task<IEnumerable<ECardByExcellenceReportDto>> GetExcellenceReportAsync(string userID, int pageNumber = 1, int pageSize = 10, string sortColumn = "RC", string sortOrder = "asc",
            string searchTerm = null, string fromDate = null, string toDate = null, string rcs = null, bool ecardReportIsSentBy = true);

        public Task<IEnumerable<EEOConfirmedReportDto>> GetEEOConfirmedReportAsync(string userID, int pageNumber = 1, int pageSize = 10, string sortColumn = "RA",
            string sortOrder = "asc", string searchTerm = null, string rcs = null);
        public Task<IEnumerable<EEOPendingReportDto>> GetEEOPendingReportAsync(string userID, int pageNumber = 1, int pageSize = 10, string sortColumn = "RC",
            string sortOrder = "asc", string searchTerm = null, string rcs = null);
        public Task<IEnumerable<EEOSummaryReportDto>> GetEEOSummaryReportAsync(string userID, int pageNumber = 1, int pageSize = 10, string sortColumn = "RC",
            string sortOrder = "asc", string searchTerm = null, string rcs = null);
    }

    public class GDSRepository : Repository, IGDSRepository
    {

        public GDSRepository(GDSDataContext context, AutoMapper.IMapper mapper)
        {
            _gdsContext = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ECardByExcellenceReportDto>> GetExcellenceReportAsync(string userID, int pageNumber = 1, int pageSize = 10, string sortColumn = "RC", string sortOrder = "asc", string searchTerm = null, string fromDate = null, string toDate = null, string rcs = null, bool ecardReportIsSentBy = true)
        {
            try
            {
                List<ECardByExcellenceReportDto> dtos
                = new List<ECardByExcellenceReportDto>();

                SqlParameter[] param = new SqlParameter[] {
                    new SqlParameter("@UserID", userID),
                    new SqlParameter("@PageNumber", pageNumber),
                    new SqlParameter("@PageSize", pageSize),
                    new SqlParameter("@SortColumn", sortColumn),
                    new SqlParameter("@SortOrder", sortOrder),
                    new SqlParameter("@SearchTerm", searchTerm),
                    new SqlParameter("@FromDate", fromDate),
                    new SqlParameter("@ToDate", toDate),
                    new SqlParameter("@RC", rcs),
                    new SqlParameter("@SentBy", ecardReportIsSentBy)
                };

                var rows = _gdsContext.ECardByExcellenceReports
                    .FromSqlRaw($"EXECUTE HRIS_ECards_ByExcellenceProgram " +
                    $"@UserID, @PageNumber, @PageSize, @SortColumn, @SortOrder, @SearchTerm, @FromDate, @ToDate, @RC, @SentBy", param)
                    .ToList();


                foreach (var row in rows)
                {
                    dtos.Add(_mapper.Map<ECardByExcellenceReportDto>(row));
                }
                return await Task.Run(() => dtos); ;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<ECardByRelationshipReportDto>> GetRelationshipReportAsync(string userID, int pageNumber = 1, int pageSize = 10, string sortColumn = "RC", string sortOrder = "asc", string searchTerm = null, string fromDate = null, string toDate = null, string rcs = null, bool ecardReportIsSentBy = true)
        {
            try
            {
                List<ECardByRelationshipReportDto> dtos
                = new List<ECardByRelationshipReportDto>();

                SqlParameter[] param = new SqlParameter[] {
                    new SqlParameter("@UserID", userID),
                    new SqlParameter("@PageNumber", pageNumber),
                    new SqlParameter("@PageSize", pageSize),
                    new SqlParameter("@SortColumn", sortColumn),
                    new SqlParameter("@SortOrder", sortOrder),
                    new SqlParameter("@SearchTerm", searchTerm),
                    new SqlParameter("@FromDate", fromDate),
                    new SqlParameter("@ToDate", toDate),
                    new SqlParameter("@RC", rcs),
                    new SqlParameter("@SentBy", ecardReportIsSentBy)
                };

                var rows = _gdsContext.ECardByRelationshipReports
                    .FromSqlRaw($"EXECUTE HRIS_ECards_ByRelationshipOfSender " +
                    $"@UserID, @PageNumber, @PageSize, @SortColumn, @SortOrder, @SearchTerm, @FromDate, @ToDate, @RC, @SentBy", param)
                    .ToList();


                foreach (var row in rows)
                {
                    dtos.Add(_mapper.Map<ECardByRelationshipReportDto>(row));
                }
                return await Task.Run(() => dtos); ;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<ECardChartDto>> GetChartAsync(int roleId, string rcs, string dps)
        {
            try
            {
                List<ECardChartDto> dtos
                = new List<ECardChartDto>();

                var param = new SqlParameter[] {
                new SqlParameter( "@RoleID", roleId),
                new SqlParameter("@RCs", rcs),
                new SqlParameter("@DPs", dps)
            };

                var data = _gdsContext.ECardChart
                    .FromSqlRaw($"EXECUTE dbo.HRIS_ECards_TotalSentChart @RoleID, @RCs, @DPs", param)
                    .ToList();


                foreach (var row in data)
                {
                    dtos.Add(
                        new ECardChartDto
                        {
                            Data = row.Data,
                            //Date = row.Date.ToString(),
                            Labels = row.Created
                        });
                }
                return await Task.Run(() => dtos);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<ECardSendAndReceivedReportDto>> GetSendAndReceivedReportAsync(string userID, int pageNumber = 1, int pageSize = 10, string sortColumn = "RC", string sortOrder = "asc", string searchTerm = null, string fromDate = null, string toDate = null, string rcs = null, bool ecardReportIsSentBy = true)
        {
            try
            {
                List<ECardSendAndReceivedReportDto> dtos
                = new List<ECardSendAndReceivedReportDto>();

                SqlParameter[] param = new SqlParameter[] {
                    new SqlParameter("@UserID", userID),
                    new SqlParameter("@PageNumber", pageNumber),
                    new SqlParameter("@PageSize", pageSize),
                    new SqlParameter("@SortColumn", sortColumn),
                    new SqlParameter("@SortOrder", sortOrder),
                    new SqlParameter("@SearchTerm", searchTerm),
                    new SqlParameter("@FromDate", fromDate),
                    new SqlParameter("@ToDate", toDate),
                    new SqlParameter("@RC", rcs),
                    new SqlParameter("@SentBy", ecardReportIsSentBy)
                };

                var rows = _gdsContext.ECardSendAndReceivedReports
                    .FromSqlRaw($"EXECUTE HRIS_ECards_ByRC " +
                    $"@UserID, @PageNumber, @PageSize, @SortColumn, @SortOrder, @SearchTerm, @FromDate, @ToDate, @RC, @SentBy", param)
                    .ToList();


                foreach (var row in rows)
                {
                    dtos.Add(_mapper.Map<ECardSendAndReceivedReportDto>(row));
                }
                return await Task.Run(() => dtos); ;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<EEOConfirmedReportDto>> GetEEOConfirmedReportAsync(string userID, int pageNumber = 1, int pageSize = 10, string sortColumn = "RA", string sortOrder = "asc", string searchTerm = null, string rcs = null)
        {
            try
            {
                List<EEOConfirmedReportDto> dtos
                = new List<EEOConfirmedReportDto>();

                SqlParameter[] param = new SqlParameter[] {
                    new SqlParameter("@UserID", userID),
                    new SqlParameter("@PageNumber", pageNumber),
                    new SqlParameter("@PageSize", pageSize),
                    new SqlParameter("@SortColumn", sortColumn),
                    new SqlParameter("@SortOrder", sortOrder),
                    new SqlParameter("@SearchTerm", searchTerm),
                    new SqlParameter("@RA", rcs)};

                var rows = _gdsContext.EEOConfirmedReports
                    .FromSqlRaw($"EXECUTE HRIS_eeo_spGetSurveyData_Confirmed6mthsbyRA_final_Report_JanJuly " +
                    $"@UserID, @PageNumber, @PageSize, @SortColumn, @SortOrder, @SearchTerm, @RA", param)
                    .ToList();


                foreach (var row in rows)
                {
                    dtos.Add(_mapper.Map<EEOConfirmedReportDto>(row));
                }
                return await Task.Run(() => dtos); ;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<EEOPendingReportDto>> GetEEOPendingReportAsync(string userID, int pageNumber = 1, int pageSize = 10, string sortColumn = "RC", string sortOrder = "asc", string searchTerm = null, string rcs = null)
        {
            try
            {
                List<EEOPendingReportDto> dtos
                = new List<EEOPendingReportDto>();

                SqlParameter[] param = new SqlParameter[] {
                    new SqlParameter("@UserID", userID),
                    new SqlParameter("@PageNumber", pageNumber),
                    new SqlParameter("@PageSize", pageSize),
                    new SqlParameter("@SortColumn", sortColumn),
                    new SqlParameter("@SortOrder", sortOrder),
                    new SqlParameter("@SearchTerm", searchTerm),
                    new SqlParameter("@RA", rcs)};

                var rows = _gdsContext.EEOPendingReports
                    .FromSqlRaw($"EXECUTE dbo.[HRIS_eeo_spGetPendingSurveyData_ByRA_final_Report_JanJuly] " +
                    $"@UserID, @PageNumber, @PageSize, @SortColumn, @SortOrder, @SearchTerm, @RA", param)
                    .ToList();


                foreach (var row in rows)
                {
                    dtos.Add(_mapper.Map<EEOPendingReportDto>(row));
                }
                return await Task.Run(() => dtos); ;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<EEOSummaryReportDto>> GetEEOSummaryReportAsync(string userID, int pageNumber = 1, int pageSize = 10, string sortColumn = "RC", string sortOrder = "asc", string searchTerm = null, string rcs = null)
        {
            try
            {
                List<EEOSummaryReportDto> dtos
                = new List<EEOSummaryReportDto>();

                SqlParameter[] param = new SqlParameter[] {
                    new SqlParameter("@UserID", userID),
                    new SqlParameter("@PageNumber", pageNumber),
                    new SqlParameter("@PageSize", pageSize),
                    new SqlParameter("@SortColumn", sortColumn),
                    new SqlParameter("@SortOrder", sortOrder),
                    new SqlParameter("@SearchTerm", searchTerm),
                    new SqlParameter("@RA", rcs)};

                var rows = _gdsContext.EEOSummaryReports
                    .FromSqlRaw($"EXECUTE dbo.[HRIS_eeo_spGetSummarydataByRC_Report_JanJuly] " +
                    $"@UserID, @PageNumber, @PageSize, @SortColumn, @SortOrder, @SearchTerm, @RA", param)
                    .ToList();


                foreach (var row in rows)
                {
                    dtos.Add(_mapper.Map<EEOSummaryReportDto>(row));
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
