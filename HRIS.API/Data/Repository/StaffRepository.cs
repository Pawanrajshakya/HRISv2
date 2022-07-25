using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IStaffRepository
    {
        //SP Nanme: spGetPagedStaffs
        public Task<IEnumerable<ActiveStaffDto>> GetActiveStaff(string userid, string rcs, string dps, string locations,
                                                     string titles, string backupTitles, string csStatus,
                                                     int pageNumber = 1, int pageSize = 10, string sortColumn = "",
                                                     string sortOrder = "", string searchTerm = "");
        //SP Name: spGetPagedStaffsOnLeave
        //option = leave or ceased
        public Task<IEnumerable<StaffLeaveReportDto>> GetStaffLeaveReport(string userid, string rcs, string dps, string titles,
                                                          string lvStatus, string option = "", int pageNumber = 1,
                                                          int pageSize = 10, string sortColumn = "",
                                                          string sortOrder = "", string searchTerm = "");

        public Task<IEnumerable<StaffEmergencyContactInfoReportDto>> GetStaffEmergencyContactInfoReport(string userid, string rcs, string dps,
                                                                         string locations, int pageNumber = 1,
                                                                         int pageSize = 10, string sortColumn = "",
                                                                         string sortOrder = "", string searchTerm = "");

        public Task<IEnumerable<VacationRosterReportDto>> GetVacationRosterReport(string userid, string rcs, string dps,
                                                                         string locations, string titles, int pageNumber = 1,
                                                                         int pageSize = 10, string sortColumn = "",
                                                                         string sortOrder = "", string searchTerm = "");

        public Task<IEnumerable<SeparationSummaryDto>> GetGetAgencySeparationSummary(string userid, string rcs, string dps,
                                                                         bool isCalenderYear, int year);

        //public Task<IEnumerable<AgencySeparationChartDto>> GetGetAgencySeparationChart(string userid, string rcs, string dps,
        //                                                         bool IsCalenderYear, int Year);

        public Task<StaffDetailDto> GetDetail(string userid,
                                              string ein); //spGetStaffByEIN

        public Task<IEnumerable<StaffEmergencyContactInfoDto>> EmergencyContacts(string userid,
                                                                                 string ein); //spGetStaffEmergencyContactsByEIN
    }

    public class StaffRepository : Repository, IStaffRepository
    {
        public StaffRepository(HRISDataContext context, AutoMapper.IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<StaffEmergencyContactInfoDto>> EmergencyContacts(string userid, string ein)
        {
            List<StaffEmergencyContactInfoDto> dtos = new List<StaffEmergencyContactInfoDto>();

            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@UserID", userid){},
                new SqlParameter("@EIN", ein){}
            };

            var rows = _context.EmergencyContactInfos
                .FromSqlRaw($"EXECUTE dbo.[spGetStaffEmergencyContactsByEIN] @UserID, @EIN", sqlParameters)
                .ToList();

            foreach (var row in rows)
            {
                dtos.Add(_mapper.Map<StaffEmergencyContactInfoDto>(row));
            }
            return await Task.Run(() => dtos);
        }

        public async Task<IEnumerable<ActiveStaffDto>> GetActiveStaff(string userid,
            string rcs, string dps, string locations, string titles,
            string backupTitles, string csStatus, int pageNumber = 1,
            int pageSize = 10, string sortColumn = "", string sortOrder = "",
            string searchTerm = "")
        {
            List<ActiveStaffDto> dtos = new List<ActiveStaffDto>();

            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@UserID", userid){},
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
                .FromSqlRaw($"EXECUTE dbo.spGetPagedStaffs @UserID, @PageNumber, @PageSize, " +
                $"@SortColumn, @SortOrder, @SearchTerm, @RCs, @DPs, @Locations, @PayTitles, @BackupTitles, @CSStatus", sqlParameters)
                .ToList();

            foreach (var row in rows)
            {
                dtos.Add(_mapper.Map<ActiveStaffDto>(row));
            }
            return await Task.Run(() => dtos); ;

        }

        public async Task<IEnumerable<StaffLeaveReportDto>> GetStaffLeaveReport(string userid, string rcs, string dps
            , string titles, string lvStatus, string option = ""
            , int pageNumber = 1, int pageSize = 10, string sortColumn = ""
            , string sortOrder = "", string searchTerm = "")
        {
            List<StaffLeaveReportDto> dtos = new List<StaffLeaveReportDto>();

            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@UserID", userid){},
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
                .FromSqlRaw($"EXECUTE dbo.spGetPagedStaffsOnLeave @UserID, @PageNumber, @PageSize, " +
                $"@SortColumn, @SortOrder, @SearchTerm, @RCs, @DPs, @PayTitles, @LvStatus, @Option", sqlParameters)
                .ToList();

            foreach (var row in rows)
            {
                dtos.Add(_mapper.Map<StaffLeaveReportDto>(row));
            }
            return await Task.Run(() => dtos); ;
        }

        public async Task<StaffDetailDto> GetDetail(string userid, string ein)
        {
            List<StaffDetailDto> dtos = new List<StaffDetailDto>();

            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@UserID", userid){},
                new SqlParameter("@EIN", ein){}
            };

            var rows = _context.StaffDetails
                .FromSqlRaw($"EXECUTE dbo.[spGetStaffByEIN] @UserID, @EIN", sqlParameters)
                .ToList();

            foreach (var row in rows)
            {
                dtos.Add(_mapper.Map<StaffDetailDto>(row));
            }
            return await Task.Run(() => dtos.SingleOrDefault(x => x.EIN == ein));
        }

        public async Task<IEnumerable<StaffEmergencyContactInfoReportDto>> GetStaffEmergencyContactInfoReport(string userid, string rcs, string dps, string locations, int pageNumber = 1, int pageSize = 10, string sortColumn = "", string sortOrder = "", string searchTerm = "")
        {
            List<StaffEmergencyContactInfoReportDto> dtos = new List<StaffEmergencyContactInfoReportDto>();

            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@UserID", userid){},
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
                .FromSqlRaw($"EXECUTE dbo.spGetPagedEmergencyContactInfo @UserID, @PageNumber, @PageSize, " +
                $"@SortColumn, @SortOrder, @SearchTerm, @RCs, @DPs, @Locations", sqlParameters)
                .ToList();

            foreach (var row in rows)
            {
                dtos.Add(_mapper.Map<StaffEmergencyContactInfoReportDto>(row));
            }
            return await Task.Run(() => dtos); ;
        }

        public async Task<IEnumerable<VacationRosterReportDto>> GetVacationRosterReport(string userid, string rcs, string dps, string locations, string titles, int pageNumber = 1, int pageSize = 10, string sortColumn = "", string sortOrder = "", string searchTerm = "")
        {
            List<VacationRosterReportDto> dtos = new List<VacationRosterReportDto>();

            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@UserID", userid){},
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
                .FromSqlRaw($"EXECUTE dbo.spGetPagedVacationRoster @UserID, @PageNumber, @PageSize, " +
                $"@SortColumn, @SortOrder, @SearchTerm, @RCs, @DPs, @Locations, @PayTitles", sqlParameters)
                .ToList();

            foreach (var row in rows)
            {
                dtos.Add(_mapper.Map<VacationRosterReportDto>(row));
            }
            return await Task.Run(() => dtos); ;
        }

        public async Task<IEnumerable<SeparationSummaryDto>> GetGetAgencySeparationSummary(string userid, string rcs, string dps, bool isCalenderYear, int year)
        {
            List<SeparationSummaryDto> dtos = new List<SeparationSummaryDto>();

            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@UserID", userid){},
                new SqlParameter("@RCs", rcs){},
                new SqlParameter("@DPs", dps){},
                new SqlParameter("@IsCalenderYear", isCalenderYear){},
                new SqlParameter("@Year", year){}
            };

            var rows = _context.VacationRosterReports
                .FromSqlRaw($"EXECUTE dbo.spGetPagedVacationRoster @UserID, @RCs, @DPs, " +
                $"@IsCalenderYear, @Year", sqlParameters)
                .ToList();

            foreach (var row in rows)
            {
                dtos.Add(_mapper.Map<SeparationSummaryDto>(row));
            }
            return await Task.Run(() => dtos
            .OrderBy(x => x.Year)
            .ThenBy(x => x.Month)
            .ThenBy(x => x.ReasonDesc).ToList()
            );
        }
    }
}
