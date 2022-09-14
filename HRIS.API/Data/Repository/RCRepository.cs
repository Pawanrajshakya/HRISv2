using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IRCRepository
    {
        public Task<List<RCDto>> GetAsync(string userid);
    }
    public class RCRepository : Repository, IRCRepository
    {

        public RCRepository(HRISDataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<RCDto>> GetAsync(string userid)
        {
            var param = new SqlParameter("@UserID", userid);
            var RCs = _context.RC.FromSqlRaw("spGetRCList @UserID", param)
                .ProjectTo<RCDto>(_mapper.ConfigurationProvider)
                .ToList();
            return await Task.Run(() => RCs.OrderBy(x=>x.Code).ToList());
        }
    }
}
