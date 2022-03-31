using AutoMapper;
using AutoMapper.QueryableExtensions;
using System.Collections.Generic;
using System.Linq;

namespace HRIS.API
{
    public class GroupRepository : IGroupRepository
    {
        private readonly HRISDataContext _context;
        private readonly IMapper _mapper;

        public GroupRepository(HRISDataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public GroupDto Get(int groupID)
        {
            return _context.Groups
                .Where(x => x.GroupID == groupID)
                .ProjectTo<GroupDto>(_mapper.ConfigurationProvider)
                .SingleOrDefault();
        }

        public IEnumerable<GroupDto> Get()
        {
            return _context.Groups
                .ProjectTo<GroupDto>(_mapper.ConfigurationProvider)
                .ToList();
        }
    }
}
