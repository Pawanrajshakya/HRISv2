using AutoMapper;
using AutoMapper.QueryableExtensions;
using System.Collections.Generic;
using System.Linq;

namespace HRIS.API
{
    public interface IRoleRepository
    {
        public RoleDto Get(int roleID);
        public IEnumerable<RoleDto> Get();
    }

    public class RoleRepository : IRoleRepository
    {
        private readonly HRISDataContext _context;
        private readonly IMapper _mapper;

        public RoleRepository(HRISDataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public RoleDto Get(int roleID)
        {
            return _context.Roles
                .Where(x => x.RoleID == roleID && x.IsVisible == true)
                .ProjectTo<RoleDto>(_mapper.ConfigurationProvider)
                .FirstOrDefault();
        }

        public IEnumerable<RoleDto> Get()
        {
            return _context.Roles
                .Where(x => x.IsVisible == true)
                .ProjectTo<RoleDto>(_mapper.ConfigurationProvider)
                .ToList();
        }
    }
}
