using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace HRIS.API
{
    public class UserRepository : IUserRepository
    {
        private readonly HRISDataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(HRISDataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public UserDto Get(string userId)
        {
            return _context.HRISUsers
                .Where(x => x.UserID == userId && x.IsVisible == true)
                .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                .SingleOrDefault();
        }

        public IEnumerable<UserDto> Get()
        {
            return _context.HRISUsers
                .Where(x => x.IsVisible == true)
                .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                .ToList();
        }

        public IEnumerable<UserDto> Get(int roleID, int groupID)
        {
            var query = _context.HRISUsers
                .Where(x => x.IsVisible == true)
                .Where(x => x.RoleID == ((roleID == 0) ? x.RoleID : roleID));
            //.Where(x=>x.UsersGroups.Contains(new UserGroup { }))
            return query.ProjectTo<UserDto>(_mapper.ConfigurationProvider).ToList();

        }

        public UserDto GetByLanID(string lanID)
        {
            UserDto userDto = new UserDto();

            var sqlParameters = new Microsoft.Data.SqlClient.SqlParameter[] {
                new Microsoft.Data.SqlClient.SqlParameter(){
                    ParameterName= "@LanID", Value= lanID
                }
            };

            var user = _context.LoginUser
                .FromSqlRaw($"EXECUTE dbo.spGetUser @LanID", sqlParameters)
                .ToList()
                .Where(x => x.LanID == lanID)
                .SingleOrDefault();

            if (user == null)
                return null;

            if (user.RoleID == 6 || user.RoleID == 7)
                return _mapper.Map<UserDto>(user);

            return _context.HRISUsers
                .Where(x => x.LanID == lanID && x.IsVisible == true && x.IsActive == true)
                .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                .SingleOrDefault();
        }

        public IEnumerable<UserListDto> Get(ReportParameters _reportParameters)
        {
            string userID = UserSession.Instance.User.UserID;

            List<UserListDto> userListDto = new List<UserListDto>();

            var sqlParameters = new Microsoft.Data.SqlClient.SqlParameter[] {
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@UserID", Value= userID},
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@PageNumber", Value= _reportParameters.PageNumber },
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@PageSize", Value= _reportParameters.PageSize},
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@SortColumn", Value= _reportParameters.SortColumn??""},
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@SortOrder", Value= _reportParameters.SortOrder??""},
                new Microsoft.Data.SqlClient.SqlParameter(){ParameterName= "@SearchTerm", Value= _reportParameters.SearchTerm??""}
            };

            var userList = _context.UserList
                .FromSqlRaw($"EXECUTE dbo.spGetPagedUsers @UserID, @PageNumber, @PageSize, @SortColumn, @SortOrder, @SearchTerm", sqlParameters)
                .ToList();

            foreach (var user in userList)
            {
                userListDto.Add(_mapper.Map<UserListDto>(user));
            }
            return userListDto;
        }
    }
}