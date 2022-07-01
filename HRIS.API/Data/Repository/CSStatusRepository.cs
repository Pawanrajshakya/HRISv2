using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface ICSStatusRepository
    {
        public Task<List<CSStatusDto>> GetAsync(string userid);
    }

    public class CSStatusRepository : Repository, ICSStatusRepository
    {
        public CSStatusRepository(HRISDataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<CSStatusDto>> GetAsync(string userid)
        {
            var param = new SqlParameter("@UserID", userid);
            var data = _context.CSStatuses
                .FromSqlRaw("spGetCSStatusList @UserID", param)
                .ProjectTo<CSStatusDto>(_mapper.ConfigurationProvider)
                .ToList();

            return await Task.Run(() => data);
        }
    }
}
