using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface ITEAMRepository
    {
        public Task<IEnumerable<TEAM_PendingCasesChartDto>> GetPendingCasesChartAsync(string rc);
        public Task<IEnumerable<TEAM_EDUChartDto>> GetTopInfractionsChartAsync(string rc);
        public Task<IEnumerable<TEAM_CaseCountByYearChartDto>> GetCaseCountByYearChartAsync(string rc);
    }

    public class TeamRepository : ITEAMRepository
    {
        private readonly TEAMDataContext _context;
        private readonly IMapper _mapper;

        public TeamRepository(TEAMDataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TEAM_CaseCountByYearChartDto>> GetCaseCountByYearChartAsync(string rc)
        {
            try
            {


                List<TEAM_CaseCountByYearChartDto> dto = new List<TEAM_CaseCountByYearChartDto>();
                var param = new Microsoft.Data.SqlClient.SqlParameter[] {
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@RCs", Value= rc }
            };

                var data = _context.Team_CaseCountByYearChart
                    .FromSqlRaw($"EXECUTE dbo.[spHRISGetCaseCountsByYearAndFlag] @RCs", param)
                    .ToList();


                foreach (var row in data)
                {
                    dto.Add(_mapper.Map<TEAM_CaseCountByYearChartDto>(row));
                }

                return await Task.Run(() => dto);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<TEAM_PendingCasesChartDto>> GetPendingCasesChartAsync(string rc)
        {
            List<TEAM_PendingCasesChartDto> dto = new List<TEAM_PendingCasesChartDto>();
            var param = new Microsoft.Data.SqlClient.SqlParameter[] {
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@RCs", Value= rc }
            };

            var data = _context.Team_PendingCasesChart
                .FromSqlRaw($"EXECUTE dbo.[spHRISGetPendingCaseCountsByUnit] @RCs", param)
                .ToList();


            foreach (var row in data)
            {
                dto.Add(_mapper.Map<TEAM_PendingCasesChartDto>(row));
            }

            return await Task.Run(() => dto);
        }

        public async Task<IEnumerable<TEAM_EDUChartDto>> GetTopInfractionsChartAsync(string rc)
        {
            List<TEAM_EDUChartDto> dto = new List<TEAM_EDUChartDto>();
            var param = new Microsoft.Data.SqlClient.SqlParameter[] {
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@RCs", Value= rc }
            };

            var data = _context.Team_PendingCasesChart
                .FromSqlRaw($"EXECUTE dbo.[dbo.spHRISGetEDUCaseCountsByInfractions] @RCs", param)
                .ToList();


            foreach (var row in data)
            {
                dto.Add(_mapper.Map<TEAM_EDUChartDto>(row));
            }

            return await Task.Run(() => dto);
        }
    }
}
