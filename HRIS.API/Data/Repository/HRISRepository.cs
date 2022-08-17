using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IHRISReportRepository
    {
        Task<IEnumerable<ActiveStaffDto>> GetActiveStaffReport(string userID, string rcs, string dps, string locations, string titles, string backupTitles, string csStatus, int pageNumber = 1, int pageSize = 10, string sortColumn = "", string sortOrder = "", string searchTerm = "");
        Task<IEnumerable<StaffEmergencyContactInfoReportDto>> GetStaffEmergencyContactInfoReport(string userID, string rcs, string dps, string locations, int pageNumber = 1, int pageSize = 10, string sortColumn = "", string sortOrder = "", string searchTerm = "");
        Task<IEnumerable<StaffLeaveReportDto>> GetStaffLeaveReport(string userID, string rcs, string dps, string titles, string lvStatus, string option = "", int pageNumber = 1, int pageSize = 10, string sortColumn = "", string sortOrder = "", string searchTerm = "");
        Task<IEnumerable<VacationRosterReportDto>> GetVacationRosterReport(string userID, string rcs, string dps, string locations, string titles, int pageNumber = 1, int pageSize = 10, string sortColumn = "", string sortOrder = "", string searchTerm = "");
        Task<IEnumerable<OvertimeCitytimeReportDto>> GetOvertimeCitytimeReport(string userID, string rcs, string dps, int minDate, int maxDate, bool totalOnly = true);
        Task<IEnumerable<EEOChartDto>> GetGenderBreakdownChart(string userID, string rcs, string dps);
        Task<IEnumerable<EEOChartDto>> GetAgencyDemographicChart(string userID, string rcs, string dps);
    }

    public class HRISRepository : Repository, IHRISReportRepository
    {

        public HRISRepository(HRISDataContext context, AutoMapper.IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ActiveStaffDto>> GetActiveStaffReport(string userID,
            string rcs, string dps, string locations, string titles,
            string backupTitles, string csStatus, int pageNumber = 1,
            int pageSize = 10, string sortColumn = "", string sortOrder = "",
            string searchTerm = "")
        {
            List<ActiveStaffDto> dtos = new List<ActiveStaffDto>();

            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@userID", userID){},
                new SqlParameter("@PageNumber", pageNumber){},
                new SqlParameter("@PageSize", pageSize){},
                new SqlParameter("@SortColumn", sortColumn){},
                new SqlParameter("@SortOrder", sortOrder){},
                new SqlParameter("@SearchTerm", searchTerm){},
                new SqlParameter("@RCs", rcs){},
                new SqlParameter("@DPs", dps){},
                new SqlParameter("@Locations", locations){},
                new SqlParameter("@PayTitles", titles){},
                new SqlParameter("@BackupTitles", backupTitles){},
                new SqlParameter("@CSStatus", csStatus){},

            };

            var rows = _context.ActiveStaffs
                .FromSqlRaw($"EXECUTE dbo.spGetPagedStaffs @userID, @PageNumber, @PageSize, " +
                $"@SortColumn, @SortOrder, @SearchTerm, @RCs, @DPs, @Locations, @PayTitles, @BackupTitles, @CSStatus", sqlParameters)
                .ToList();

            foreach (var row in rows)
            {
                dtos.Add(_mapper.Map<ActiveStaffDto>(row));
            }
            return await Task.Run(() => dtos); ;

        }

        public async Task<IEnumerable<StaffLeaveReportDto>> GetStaffLeaveReport(string userID, string rcs, string dps
            , string titles, string lvStatus, string option = ""
            , int pageNumber = 1, int pageSize = 10, string sortColumn = ""
            , string sortOrder = "", string searchTerm = "")
        {
            List<StaffLeaveReportDto> dtos = new List<StaffLeaveReportDto>();

            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@userID", userID){},
                new SqlParameter("@PageNumber", pageNumber){},
                new SqlParameter("@PageSize", pageSize){},
                new SqlParameter("@SortColumn", sortColumn){},
                new SqlParameter("@SortOrder", sortOrder){},
                new SqlParameter("@SearchTerm", searchTerm){},
                new SqlParameter("@RCs", rcs){},
                new SqlParameter("@DPs", dps){},
                new SqlParameter("@PayTitles", titles){},
                new SqlParameter("@LvStatus", lvStatus){},
                new SqlParameter("@Option", option){},

            };

            var rows = _context.StaffLeaveReports
                .FromSqlRaw($"EXECUTE dbo.spGetPagedStaffsOnLeave @userID, @PageNumber, @PageSize, " +
                $"@SortColumn, @SortOrder, @SearchTerm, @RCs, @DPs, @PayTitles, @LvStatus, @Option", sqlParameters)
                .ToList();

            foreach (var row in rows)
            {
                dtos.Add(_mapper.Map<StaffLeaveReportDto>(row));
            }
            return await Task.Run(() => dtos); ;
        }

        public async Task<IEnumerable<StaffEmergencyContactInfoReportDto>> GetStaffEmergencyContactInfoReport(string userID, string rcs, string dps, string locations, int pageNumber = 1, int pageSize = 10, string sortColumn = "", string sortOrder = "", string searchTerm = "")
        {
            List<StaffEmergencyContactInfoReportDto> dtos = new List<StaffEmergencyContactInfoReportDto>();

            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@userID", userID){},
                new SqlParameter("@PageNumber", pageNumber){},
                new SqlParameter("@PageSize", pageSize){},
                new SqlParameter("@SortColumn", sortColumn){},
                new SqlParameter("@SortOrder", sortOrder){},
                new SqlParameter("@SearchTerm", searchTerm){},
                new SqlParameter("@RCs", rcs){},
                new SqlParameter("@DPs", dps){},
                new SqlParameter("@Locations", locations){}

            };

            var rows = _context.StaffEmergencyContactInfoReports
                .FromSqlRaw($"EXECUTE dbo.spGetPagedEmergencyContactInfo @userID, @PageNumber, @PageSize, " +
                $"@SortColumn, @SortOrder, @SearchTerm, @RCs, @DPs, @Locations", sqlParameters)
                .ToList();

            foreach (var row in rows)
            {
                dtos.Add(_mapper.Map<StaffEmergencyContactInfoReportDto>(row));
            }
            return await Task.Run(() => dtos); ;
        }

        public async Task<IEnumerable<VacationRosterReportDto>> GetVacationRosterReport(string userID, string rcs, string dps, string locations, string titles, int pageNumber = 1, int pageSize = 10, string sortColumn = "", string sortOrder = "", string searchTerm = "")
        {
            List<VacationRosterReportDto> dtos = new List<VacationRosterReportDto>();

            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@userID", userID){},
                new SqlParameter("@PageNumber", pageNumber){},
                new SqlParameter("@PageSize", pageSize){},
                new SqlParameter("@SortColumn", sortColumn){},
                new SqlParameter("@SortOrder", sortOrder){},
                new SqlParameter("@SearchTerm", searchTerm){},
                new SqlParameter("@RCs", rcs){},
                new SqlParameter("@DPs", dps){},
                new SqlParameter("@Locations", locations){},
                new SqlParameter("@PayTitles", titles){}

            };

            var rows = _context.VacationRosterReports
                .FromSqlRaw($"EXECUTE dbo.spGetPagedVacationRoster @userID, @PageNumber, @PageSize, " +
                $"@SortColumn, @SortOrder, @SearchTerm, @RCs, @DPs, @Locations, @PayTitles", sqlParameters)
                .ToList();

            foreach (var row in rows)
            {
                dtos.Add(_mapper.Map<VacationRosterReportDto>(row));
            }
            return await Task.Run(() => dtos); ;
        }

        public async Task<IEnumerable<OvertimeCitytimeReportDto>> GetOvertimeCitytimeReport(string userID, string rcs, string dps, int minDate, int maxDate, bool totalOnly = true)
        {
            List<OvertimeCitytimeReportDto> dtos = new List<OvertimeCitytimeReportDto>();

            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@userID", userID){},
                new SqlParameter("@RCs", rcs){},
                new SqlParameter("@DPs", dps){},
                new SqlParameter("@MinDate", minDate){},
                new SqlParameter("@MaxDate", maxDate){},
                new SqlParameter("@TotalOnly", totalOnly){}
            };

            var rows = _context.OvertimeCitytimeReports
                .FromSqlRaw($"EXECUTE dbo.spCitytimeOTReportByMonth @userID, @RCs, @DPs, @MinDate, @MaxDate, @TotalOnly", sqlParameters)
                .ToList();

            foreach (var row in rows)
            {
                dtos.Add(_mapper.Map<OvertimeCitytimeReportDto>(row));
            }
            return await Task.Run(() => dtos); ;
        }

        public async Task<IEnumerable<EEOChartDto>> GetGenderBreakdownChart(string userID, string rcs, string dps)
        {
            try
            {
                List<EEOChartDto> dtos = new List<EEOChartDto>();

                SqlParameter[] sqlParameters = new SqlParameter[] { new SqlParameter("@userID", userID) { }, new SqlParameter("@RCs", rcs) { }, new SqlParameter("@DPs", dps) { } };

                var rows = _context.EEOCharts
                    .FromSqlRaw($"EXECUTE dbo.spGetEEOGenderChart @userID, @RCs, @DPs", sqlParameters)
                    .ToList();

                foreach (var row in rows)
                {
                    dtos.Add(_mapper.Map<EEOChartDto>(row));
                }
                return await Task.Run(() => dtos); ;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<EEOChartDto>> GetAgencyDemographicChart(string userID, string rcs, string dps)
        {
            try
            {
                List<EEOChartDto> dtos = new List<EEOChartDto>();

                SqlParameter[] sqlParameters = new SqlParameter[] { new SqlParameter("@userID", userID) { }, new SqlParameter("@RCs", rcs) { }, new SqlParameter("@DPs", dps) { } };

                var rows = _context.EEOCharts
                    .FromSqlRaw($"EXECUTE dbo.spGetAgencyDemographicChart @userID, @RCs, @DPs", sqlParameters)
                    .ToList();

                foreach (var row in rows)
                {
                    dtos.Add(_mapper.Map<EEOChartDto>(row));
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
