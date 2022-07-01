using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IHeadcountRepository
    {
        public Task<List<AgencyHeadcountChartDto>> GetChartAsync(string userID, string rc, string dp);
    }

    public class HeadcountRepository : Repository, IHeadcountRepository
    {
        private readonly IRCRepository _rcRepository;

        public HeadcountRepository(HRISDataContext context
            ,           IMapper mapper
            , IRCRepository rcRepository
            )
        {
            _context = context;
            _mapper = mapper;
            _rcRepository = rcRepository;
        }
        public Task<List<AgencyHeadcountChartDto>> GetChartAsync(string userID, string rc, string dp)
        {
            List<AgencyHeadcountChartDto> dtos = new List<AgencyHeadcountChartDto>();

            var param = new Microsoft.Data.SqlClient.SqlParameter[] {
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@UserID", Value= userID},
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@RCs", Value= rc },
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@DPs", Value= dp}
            };

            var data = _context.AgencyHeadcountChart
                .FromSqlRaw($"EXECUTE dbo.[spGetAgencyHeadcountChart] @UserID, @RCs, @DPs", param)
                .ToList();


            foreach (var item in data)
            {
                var agencyHeadcountChartDto = _mapper.Map<AgencyHeadcountChartDto>(item);
                dtos.Add(agencyHeadcountChartDto);
            }

            return Task.Run(() => dtos);
        }
    }
}
