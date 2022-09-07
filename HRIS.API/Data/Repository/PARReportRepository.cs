using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IPARRepository
    {
        public Task<IEnumerable<PARReportDto>> GetReportAsync(string userid, string dateFrom, string dateTo, string openClose, string rcs, string dps, string titles, string locations, int pageNumber = 1, int pageSize = 10, string sortColumn = "", string sortOrder = "", string searchTerm = "");
        public Task<IEnumerable<PARDetailDto>> GetDetailAsync(string reqNumber);
    }

    public class PARRepository : Repository, IPARRepository
    {

        public PARRepository(HRISDataContext context, AutoMapper.IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<PARReportDto>> GetReportAsync(string userid,
            string dateFrom, string dateTo, string openClose, string rcs, string dps, string titles,
            string locations, int pageNumber = 1,
            int pageSize = 10, string sortColumn = "", string sortOrder = "",
            string searchTerm = "")
        {
            try
            {
                bool isValidFromDate = DateTime.TryParse(dateFrom, out DateTime _from);
                bool isValidToDate = DateTime.TryParse(dateTo, out DateTime _to);

                List<PARReportDto> dtos = new List<PARReportDto>();

                SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@UserID", userid),
                new SqlParameter("@PageNumber", pageNumber),
                new SqlParameter("@PageSize", pageSize),
                new SqlParameter("@SortColumn", sortColumn),
                new SqlParameter("@SortOrder", sortOrder),
                new SqlParameter("@SearchTerm", searchTerm),
                new SqlParameter("@DateFrom", isValidFromDate ? dateFrom : ""),
                new SqlParameter("@DateTo", isValidToDate ? dateTo : ""),
                new SqlParameter("@OpenClose", openClose),
                new SqlParameter("@RCs", rcs),
                new SqlParameter("@DPs", dps),
                new SqlParameter("@Titles", titles),
                new SqlParameter("@Locations", locations),
            };

                var rows = _context.PARReports
                    .FromSqlRaw($"EXECUTE dbo.spGetPagedPARCombinedReport @UserID, @PageNumber, @PageSize, " +
                    $"@SortColumn, @SortOrder, @SearchTerm, @DateFrom, @DateTo, @OpenClose, @RCs, @DPs, @Titles, @Locations", sqlParameters)
                    .ToList();

                foreach (var row in rows)
                {
                    dtos.Add(_mapper.Map<PARReportDto>(row));
                }
                return await Task.Run(() => dtos); ;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<PARDetailDto>> GetDetailAsync(string reqNumber)
        {
            try
            {
                List<PARDetailDto> dtos = new List<PARDetailDto>();

                SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@REQNUMBER", reqNumber)
            };

                var rows = _context.PARDetails
                    .FromSqlRaw($"EXECUTE dbo.spGetPARInfoByReqNumber @REQNUMBER", sqlParameters)
                    .ToList();

                foreach (var row in rows)
                {
                    dtos.Add(_mapper.Map<PARDetailDto>(row));
                }
                return await Task.Run(() => dtos); ;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
