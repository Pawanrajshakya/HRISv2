using AutoMapper;
using AutoMapper.QueryableExtensions;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IRoleRepository
    {
        public Task<RoleDto> GetAsync(int roleID);
        public Task<IEnumerable<RoleDto>> GetAsync();
    }

    public class RoleRepository : Repository, IRoleRepository
    {
        public RoleRepository(HRISDataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<RoleDto> GetAsync(int roleID)
        {
            RoleDto dto = _context.Roles
                .Where(x => x.RoleID == roleID && x.IsVisible == true)
                .ProjectTo<RoleDto>(_mapper.ConfigurationProvider)
                .FirstOrDefault();

            return await Task.Run(() => dto);
        }

        public async Task<IEnumerable<RoleDto>> GetAsync()
        {
            return await Task.Run(() => _context.Roles
                .Where(x => x.IsVisible == true)
                .ProjectTo<RoleDto>(_mapper.ConfigurationProvider)
                .ToList());
        }
    }
}
