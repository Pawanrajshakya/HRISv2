using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
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

        public async Task<IEnumerable<DPDto>> GetAsync(string rc = "")
        {
            var userId = new SqlParameter("@UserID", UserSession.Instance.User.UserID);
            var rC = new SqlParameter("@RC", rc);
            var DPs = _context.DP.FromSqlRaw("spGetDPList @UserID", userId, rC)
                .ProjectTo<DPDto>(_mapper.ConfigurationProvider)
                .ToList();
            return await Task.Run(() => DPs);
        }
    }
}
