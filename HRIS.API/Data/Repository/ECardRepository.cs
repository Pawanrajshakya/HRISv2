using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IEcardRepository
    {
        public Task<List<EcardChartDto>> GetChartAsync();
    }

    public class EcardRepository : IEcardRepository
    {
        private readonly GDSDataContext _gDSDataContext;
        private readonly IMapper _mapper;
        private readonly IRCRepository _rcRepository;

        public EcardRepository(GDSDataContext gDSDataContext
            , IMapper mapper
            , IRCRepository rcRepository)
        {
            _gDSDataContext = gDSDataContext;
            _mapper = mapper;
            _rcRepository = rcRepository;
        }

        public async Task<List<EcardChartDto>> GetChartAsync()
        {
            int roleId = UserSession.Instance.User.RoleID;
            string rc = Utility.ConvertToString((_rcRepository.Get(UserSession.Instance.User.UserID)).Select(x=>x.Code).ToList());
            string dp = "";

            List<EcardChartDto> ecardChartDtos
                = new List<EcardChartDto>();

            var param = new Microsoft.Data.SqlClient.SqlParameter[] {
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@RoleID", Value= roleId},
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@RCs", Value= rc },
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@DPs", Value= dp}
            };

            var ecards = _gDSDataContext.EcardCharts
                .FromSqlRaw($"EXECUTE dbo.HRIS_ECards_TotalSentChart @RoleID, @RCs, @DPs", param)
                .ToList();


            foreach (var item in ecards)
            {
                ecardChartDtos.Add(new EcardChartDto { Data = item.Data, Date = item.Date.ToString(), Labels = item.Created });
            }
            return await Task.Run(() => ecardChartDtos);
        }

        
    }
}
