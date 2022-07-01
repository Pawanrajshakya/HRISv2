using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IGroupRepository
    {
        public IEnumerable<GroupDto> Get(string userID);
        public Task<IEnumerable<GroupDto>> GetAsync(string userID);
        public GroupDto Get(int groupID);
        public IEnumerable<GroupDto> Get();
    }
    public class GroupRepository : Repository, IGroupRepository
    {
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

        public IEnumerable<GroupDto> Get(string userID)
        {
            List<GroupDto> items = new List<GroupDto>();

            var sqlParameters = new Microsoft.Data.SqlClient.SqlParameter[] {
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@UserID", Value= userID}
            };

            var list = _context.Groups
                .FromSqlRaw($"EXECUTE dbo.spGetUserGroups @UserID", sqlParameters)
                .ToList();

            foreach (var item in list)
            {
                GroupDto groupDto = _mapper.Map<GroupDto>(item);
                items.Add(groupDto);
            }
            return items;
        }

        public async Task<IEnumerable<GroupDto>> GetAsync(string userID)
        {
            List<GroupDto> items = new List<GroupDto>();

            var sqlParameters = new Microsoft.Data.SqlClient.SqlParameter[] {
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@UserID", Value= userID}
            };

            var list = _context.Groups
                .FromSqlRaw($"EXECUTE dbo.spGetUserGroups @UserID", sqlParameters)
                .ToList();

            foreach (var item in list)
            {
                GroupDto groupDto = _mapper.Map<GroupDto>(item);
                items.Add(groupDto);
            }
            return await Task.Run(() => items);
        }
    }
}
