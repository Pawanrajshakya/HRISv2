using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HRIS.API
{
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

        public List<EcardChartDto> Get()
        {
            int roleId = UserSession.Instance.User.RoleID;
            string rc = ConvertToString(_rcRepository.Get().Select(x=>x.Code).ToList());
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
            return ecardChartDtos;
        }

        public static string ConvertToString(object o)
        {
            if (o == null)
            {
                if (o is DateTime)
                    return null;
                return string.Empty;
            }
            else if (o.GetType() == typeof(List<string>))
            {
                return string.Join(",", (List<string>)o);
            }
            else if (o.GetType() == typeof(IEnumerable<string>))
            {
                return string.Join(",", (IEnumerable<string>)o);
            }
            else
                return o.ToString();
        }
    }
}
