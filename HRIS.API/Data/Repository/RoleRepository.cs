using AutoMapper;
using AutoMapper.QueryableExtensions;
using HRIS.API.Interfaces;
using HRIS.API.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API.Data.Repository
{
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
