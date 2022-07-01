using AutoMapper.QueryableExtensions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IRetirementResignationFMLARepository
    {
        public Task<List<RetirementResignationFMLADto>> GetAsync(string userid, string rc, int months);
    }

    public class RetirementResignationFMLARepository : Repository, IRetirementResignationFMLARepository
    {
        public RetirementResignationFMLARepository(HRISDataContext context, AutoMapper.IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<RetirementResignationFMLADto>> GetAsync(string userid, string rc, int months)
        {
            SqlParameter useridParam = new SqlParameter("@UserID", userid);
            SqlParameter rcParam = new SqlParameter("@RCs", rc);
            SqlParameter monthsParam = new SqlParameter("Months", months);

            var data = _context.RetirementResignationFMLAs.FromSqlRaw("dbo.spGetHRISFMLARetirementResignation @UserID", useridParam, rcParam, monthsParam)
                .ProjectTo<RetirementResignationFMLADto>(_mapper.ConfigurationProvider)
                .ToList();

            return await Task.Run(() => data);
        }
    }
}
