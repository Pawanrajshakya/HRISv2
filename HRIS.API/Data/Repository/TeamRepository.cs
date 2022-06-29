using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface ITEAMRepository
    {
        public Task<IEnumerable<Team_PendingCasesChartDto>> GetPendingCasesChartAsync(string rc);
        public Task<IEnumerable<Team_TopInfractionsChartDto>> GetTopInfractionsChartAsync(string rc);
        public Task<IEnumerable<Team_CaseCountByYearChartDto>> GetCaseCountByYearChartAsync(string rc);
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

        public async Task<IEnumerable<Team_CaseCountByYearChartDto>> GetCaseCountByYearChartAsync(string rc)
        {
            try
            {


                List<Team_CaseCountByYearChartDto> dto = new List<Team_CaseCountByYearChartDto>();
                var param = new Microsoft.Data.SqlClient.SqlParameter[] {
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@RCs", Value= rc }
            };

                var data = _context.Team_CaseCountByYearChart
                    .FromSqlRaw($"EXECUTE dbo.[spHRISGetCaseCountsByYearAndFlag] @RCs", param)
                    .ToList();


                foreach (var row in data)
                {
                    dto.Add(_mapper.Map<Team_CaseCountByYearChartDto>(row));
                }

                return await Task.Run(() => dto);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<Team_PendingCasesChartDto>> GetPendingCasesChartAsync(string rc)
        {
            List<Team_PendingCasesChartDto> dto = new List<Team_PendingCasesChartDto>();
            var param = new Microsoft.Data.SqlClient.SqlParameter[] {
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@RCs", Value= rc }
            };

            var data = _context.Team_PendingCasesChart
                .FromSqlRaw($"EXECUTE dbo.[spHRISGetPendingCaseCountsByUnit] @RCs", param)
                .ToList();


            foreach (var row in data)
            {
                dto.Add(_mapper.Map<Team_PendingCasesChartDto>(row));
            }

            return await Task.Run(() => dto);
        }

        public async Task<IEnumerable<Team_TopInfractionsChartDto>> GetTopInfractionsChartAsync(string rc)
        {
            List<Team_TopInfractionsChartDto> dto = new List<Team_TopInfractionsChartDto>();
            var param = new Microsoft.Data.SqlClient.SqlParameter[] {
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@RCs", Value= rc }
            };

            var data = _context.Team_TopInfractionsChart
                .FromSqlRaw($"EXECUTE dbo.[spHRISGetEDUCaseCountsByInfractions] @RCs", param)
                .ToList();


            foreach (var row in data)
            {
                dto.Add(_mapper.Map<Team_TopInfractionsChartDto>(row));
            }

            return await Task.Run(() => dto);
        }
    }
}
