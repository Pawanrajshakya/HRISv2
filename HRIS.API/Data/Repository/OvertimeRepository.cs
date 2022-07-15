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
        public Task<StaffOvertimeSummaryDto> GetStaffOTSummary(string userid, string ein, string calenderType);
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

        public async Task<StaffOvertimeSummaryDto> GetStaffOTSummary(string userid, string ein, string calenderType)
        {
            try
            {
                List<StaffOvertimeSummaryDto> dtos = new List<StaffOvertimeSummaryDto>();

                SqlParameter[] sqlParameters = 
                    new SqlParameter[] { 
                        new SqlParameter("@UserID", userid) { }, 
                        new SqlParameter("@EIN", ein) { }, 
                        new SqlParameter("@IsCalendar", calenderType) { } 
                    };

                var rows = _context.StaffOvertimeSummaries
                    .FromSqlRaw($"EXECUTE dbo.[spHRISReportOTSummaryByEIN] @UserID, @EIN, @IsCalendar", sqlParameters)
                    .ToList();

                foreach (var row in rows)
                {
                    dtos.Add(_mapper.Map<StaffOvertimeSummaryDto>(row));
                }
                return await Task.Run(() => dtos.SingleOrDefault());
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
    }
}
