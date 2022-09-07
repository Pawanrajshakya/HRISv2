using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IDPRepository
    {
        public Task<IEnumerable<DPDto>> GetAsync();
        public Task<IEnumerable<DPDto>> GetAsync(string userid = null);
        public Task<IEnumerable<DPDto>> GetByUserIDAsync(string userid, string rc = "");
    }

    public class DPRepository : Repository, IDPRepository
    {
        public DPRepository(HRISDataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<DPDto>> GetAsync(string userid = null)
        {
            SqlParameter[] sqlParameters = new SqlParameter[] { new SqlParameter("@UserID", userid ?? UserSession.Instance.User.UserID),
            new SqlParameter("@RC", "") };

            var DPs = _context.DP.FromSqlRaw("spGetDPList @UserID, @RC", sqlParameters)
                .ProjectTo<DPDto>(_mapper.ConfigurationProvider)
                .ToList();

            return await Task.Run(() => DPs);
        }

        public async Task<IEnumerable<DPDto>> GetAsync()
        {
            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@UserID", UserSession.Instance.User.UserID),
                new SqlParameter("@RC", "")
            };

            var DPs = _context.DP.FromSqlRaw("spGetDPList @UserID, @RC", sqlParameters)
                .ProjectTo<DPDto>(_mapper.ConfigurationProvider)
                .ToList();

            return await Task.Run(() => DPs);
        }

        public async Task<IEnumerable<DPDto>> GetByUserIDAsync(string userid, string rc = "")
        {
            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@RC", rc),
                new SqlParameter("@UserID", userid)
            };

            var DPs = _context.DP.FromSqlRaw("spGetDPList @UserID, @RC", sqlParameters)
                .ProjectTo<DPDto>(_mapper.ConfigurationProvider)
                .ToList();

            return await Task.Run(() => DPs);
        }
    }
}
