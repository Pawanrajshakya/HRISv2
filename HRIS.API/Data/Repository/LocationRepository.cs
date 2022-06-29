using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface ILocationRepository
    {
        public Task<List<LocationDto>> GetAsync(string userid);
    }

    public class LocationRepository : ILocationRepository
    {
        private readonly HRISDataContext _context;
        private readonly IMapper _mapper;

        public LocationRepository(HRISDataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<LocationDto>> GetAsync(string userid)
        {
            var param = new SqlParameter("@UserID", userid);
            var data = _context.Location.FromSqlRaw("spGetLocationList @UserID", param)
                .ProjectTo<LocationDto>(_mapper.ConfigurationProvider)
                .ToList();

            return await Task.Run(() => data);
        }
    }
}
