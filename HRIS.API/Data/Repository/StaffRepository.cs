using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IStaffRepository
    {
        public Task<IEnumerable<ActiveStaffDto>> Get(
            string userid,
            int pageNumber = 1,
            int pageSize = 10,
            string sortColumn = "",
            string sortOrder = "",
            string searchTerm = "",
            List<string> rcs = null, 
            List<string> dps = null, 
            List<string> locations = null, 
            List<string> payTitles = null, 
            List<string> backupTitles = null, 
            List<string> csStatus = null);
    }

    public class StaffRepository : Repository, IStaffRepository
    {
        public StaffRepository(HRISDataContext context, AutoMapper.IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ActiveStaffDto>> Get(string userid, int pageNumber = 1, int pageSize = 10, 
            string sortColumn = "", string sortOrder = "", string searchTerm = "", 
            List<string> rcs = null, List<string> dps = null, List<string> locations = null, 
            List<string> payTitles = null, List<string> backupTitles = null, List<string> csStatus = null)
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
                new SqlParameter("@PayTitles", payTitles){},
                new SqlParameter("@BackupTitles", backupTitles){},
                new SqlParameter("@CSStatus", csStatus){},

            };

            var rows = _context.ActiveStaffs
                .FromSqlRaw($"EXECUTE dbo.spGetPagedStaffs @UserID, @PageNumber, @PageSize, " +
                $"@SortColumn, @SortOrder, @SearchTerm", sqlParameters)
                .ToList();

            foreach (var row in rows)
            {
                dtos.Add(_mapper.Map<ActiveStaffDto>(row));
            }
            return await Task.Run(() => dtos); ;

        }
    }
}
