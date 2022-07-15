using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface ITEAMRepository
    {
        public Task<IEnumerable<PendingCasesChartDto>> GetPendingCasesChartAsync(string rc);
        public Task<IEnumerable<TopInfractionsChartDto>> GetTopInfractionsChartAsync(string rc);
        public Task<IEnumerable<CaseCountByYearChartDto>> GetCaseCountByYearChartAsync(string rc);
        public Task<IEnumerable<StaffEDUDetailDto>> GetStaffEDUDetail(string userid, string ein);
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

        public async Task<IEnumerable<CaseCountByYearChartDto>> GetCaseCountByYearChartAsync(string rc)
        {
            try
            {
                List<CaseCountByYearChartDto> dtos = new List<CaseCountByYearChartDto>();

                SqlParameter[] sqlParameters =
                    new SqlParameter[] { new SqlParameter() { ParameterName = "@RCs", Value = rc } };

                var data = _context.CaseCountByYearChart
                    .FromSqlRaw($"EXECUTE dbo.[spHRISGetCaseCountsByYearAndFlag] @RCs", sqlParameters)
                    .ToList();


                foreach (var row in data)
                {
                    dtos.Add(_mapper.Map<CaseCountByYearChartDto>(row));
                }

                return await Task.Run(() => dtos);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<PendingCasesChartDto>> GetPendingCasesChartAsync(string rc)
        {
            List<PendingCasesChartDto> dtos = new List<PendingCasesChartDto>();

            SqlParameter[] sqlParameters =
                new SqlParameter[] { new SqlParameter() { ParameterName = "@RCs", Value = rc } };

            var data = _context.PendingCasesChart
                .FromSqlRaw($"EXECUTE dbo.[spHRISGetPendingCaseCountsByUnit] @RCs", sqlParameters)
                .ToList();


            foreach (var row in data)
            {
                dtos.Add(_mapper.Map<PendingCasesChartDto>(row));
            }

            return await Task.Run(() => dtos);
        }

        public async Task<IEnumerable<TopInfractionsChartDto>> GetTopInfractionsChartAsync(string rc)
        {
            List<TopInfractionsChartDto> dtos = new List<TopInfractionsChartDto>();

            SqlParameter[] sqlParameters = 
                new SqlParameter[] { new SqlParameter() { ParameterName = "@RCs", Value = rc } };

            var data = _context.TopInfractionsChart
                .FromSqlRaw($"EXECUTE dbo.[spHRISGetEDUCaseCountsByInfractions] @RCs", sqlParameters)
                .ToList();


            foreach (var row in data)
            {
                dtos.Add(_mapper.Map<TopInfractionsChartDto>(row));
            }

            return await Task.Run(() => dtos);
        }

        public async Task<IEnumerable<StaffEDUDetailDto>> GetStaffEDUDetail(string userid, string ein)
        {
            List<StaffEDUDetailDto> dtos = new List<StaffEDUDetailDto>();

            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@UserID", userid){},
                new SqlParameter("@EIN", ein){}
            };

            var data = _context.StaffEDUDetails
                .FromSqlRaw($"EXECUTE dbo.[spHRISEDUDetailsByEIN] @UserID, @EIN", sqlParameters)
                .ToList();


            foreach (var row in data)
            {
                dtos.Add(_mapper.Map<StaffEDUDetailDto>(row));
            }

            return await Task.Run(() => dtos);
        }
    }
}
