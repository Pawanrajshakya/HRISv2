using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IAgencySeparationRepository
    {
        public Task<IEnumerable<SeparationSummaryDto>> GetChartAsync(string userid, string rcs, string dps,
                                                                         bool isCalenderYear, int year);
    }

    public class AgencySeparationRepository : Repository, IAgencySeparationRepository
    {
        public AgencySeparationRepository(HRISDataContext context, AutoMapper.IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        
        public async Task<IEnumerable<SeparationSummaryDto>> 
            GetChartAsync(string userid,
                                          string rcs,
                                          string dps,
                                          bool isCalenderYear,
                                          int year)
        {
            List<SeparationSummaryDto> dtos = new List<SeparationSummaryDto>();

            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@UserID", userid){},
                new SqlParameter("@RCs", rcs){},
                new SqlParameter("@DPs", dps){},
                new SqlParameter("@IsCalenderYear", isCalenderYear){},
                new SqlParameter("@Year", year){}
            };

            var rows = _context.SeparationSummaries
                .FromSqlRaw($"EXECUTE dbo.[spGetAgencySeparationsChart] @UserID, @RCs, @DPs, " +
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
