using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public class DPRepository : IDPRepository
    {
        private readonly HRISDataContext _context;
        private readonly IMapper _mapper;

        public DPRepository(HRISDataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<DPDto> Get(string userid = null)
        {
            var _userId = new SqlParameter("@UserID", userid ?? UserSession.Instance.User.UserID);
            var rC = new SqlParameter("@RC", "");
            var DPs = _context.DP.FromSqlRaw("spGetDPList @UserID, @RC", _userId, rC)
                .ProjectTo<DPDto>(_mapper.ConfigurationProvider)
                .ToList();
            return DPs;
        }

        public async Task<IEnumerable<DPDto>> GetAsync()
        {
            var userId = new SqlParameter("@UserID", UserSession.Instance.User.UserID);
            var rC = new SqlParameter("@RC", "");
            var DPs = _context.DP.FromSqlRaw("spGetDPList @UserID, @RC", userId, rC)
                .ProjectTo<DPDto>(_mapper.ConfigurationProvider)
                .ToList();
            return await Task.Run(() => DPs);
        }

        public async Task<IEnumerable<DPDto>> GetByUserIDAsync(string userid, string rc = "")
        {
            var rC = new SqlParameter("@RC", rc);
            var userID = new SqlParameter("@UserID", userid);
            var DPs = _context.DP.FromSqlRaw("spGetDPList @UserID, @RC", userID, rC)
                .ProjectTo<DPDto>(_mapper.ConfigurationProvider)
                .ToList();
            return await Task.Run(() => DPs);
        }
    }
}
