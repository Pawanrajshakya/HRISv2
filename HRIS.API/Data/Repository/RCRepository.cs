using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace HRIS.API
{
    public class RCRepository : IRCRepository
    {

        private readonly HRISDataContext _context;
        private readonly IMapper _mapper;

        public RCRepository(HRISDataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<RCDto> Get()
        {
            var param = new SqlParameter("@UserID", UserSession.Instance.User.UserID);
            var RCs = _context.RC.FromSqlRaw("spGetRCList @UserID", param)
                .ProjectTo<RCDto>(_mapper.ConfigurationProvider)
                .ToList();
            return RCs;
        }

        
    }
}
