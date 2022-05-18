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
        public Task<IEnumerable<RCDto>> GetAsync(string userid);
        public IEnumerable<RCDto> Get(string userid);
    }
    public class RCRepository : IRCRepository
    {

        private readonly HRISDataContext _context;
        private readonly IMapper _mapper;

        public RCRepository(HRISDataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RCDto>> GetAsync(string userid)
        {
            var param = new SqlParameter("@UserID", userid);
            var RCs = _context.RC.FromSqlRaw("spGetRCList @UserID", param)
                .ProjectTo<RCDto>(_mapper.ConfigurationProvider)
                .ToList();
            return await Task.Run(() => RCs);
        }

        public IEnumerable<RCDto> Get(string userid)
        {
            var param = new SqlParameter("@UserID", userid);
            var RCs = _context.RC.FromSqlRaw("spGetRCList @UserID", param)
                .ProjectTo<RCDto>(_mapper.ConfigurationProvider)
                .ToList();
            return RCs;
        }

    }
}
