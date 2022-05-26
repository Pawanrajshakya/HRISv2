using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IEcardRepository
    {
        public Task<IEnumerable<EcardChartDto>> GetChartAsync(int roleId, string dp);
    }

    public class EcardRepository : IEcardRepository
    {
        private readonly GDSDataContext _gDSDataContext;

        public EcardRepository(GDSDataContext gDSDataContext)
        {
            _gDSDataContext = gDSDataContext;
        }

        public async Task<IEnumerable<EcardChartDto>> GetChartAsync(int roleId, string dp)
        {

            List<EcardChartDto> ecardChartDtos
                = new List<EcardChartDto>();

            var param = new Microsoft.Data.SqlClient.SqlParameter[] {
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@RoleID", Value= roleId},
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@RCs", Value= "" },
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@DPs", Value= dp}
            };

            var data = _gDSDataContext.EcardCharts
                .FromSqlRaw($"EXECUTE dbo.HRIS_ECards_TotalSentChart @RoleID, @RCs, @DPs", param)
                .ToList();


            foreach (var row in data)
            {
                ecardChartDtos.Add(
                    new EcardChartDto
                    {
                        Data = row.Data,
                        Date = row.Date.ToString(),
                        Labels = row.Created
                    });
            }
            return await Task.Run(() => ecardChartDtos);
        }
    }
}
