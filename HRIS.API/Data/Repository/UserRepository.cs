using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public class UserRepository : IUserRepository
    {
        private readonly HRISDataContext _context;
        private readonly IMapper _mapper;
        private readonly IGroupRepository _groupRepository;

        public UserRepository(HRISDataContext context
            , IMapper mapper
            , IGroupRepository groupRepository)
        {
            _context = context;
            _mapper = mapper;
            _groupRepository = groupRepository;
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

            return query.ProjectTo<UserDto>(_mapper.ConfigurationProvider).ToList();

        }

        public UserDto GetByLanID(string lanID)
        {
            UserDto userDto = new UserDto();

            var sqlParameters = new SqlParameter[] {
                new SqlParameter(){
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

        public IEnumerable<UserListDto> Get(TableViewParameters _reportParameters)
        {
            string userID = UserSession.Instance.User.UserID;

            List<UserListDto> userListDto = new List<UserListDto>();

            var sqlParameters = new SqlParameter[] {
                new SqlParameter(){ParameterName= "@UserID", Value= userID},
                new SqlParameter(){ParameterName= "@PageNumber", Value= _reportParameters.PageNumber },
                new SqlParameter(){ParameterName= "@PageSize", Value= _reportParameters.PageSize},
                new SqlParameter(){ParameterName= "@SortColumn", Value= _reportParameters.SortColumn??""},
                new SqlParameter(){ParameterName= "@SortOrder", Value= _reportParameters.SortOrder??""},
                new SqlParameter(){ParameterName= "@SearchTerm", Value= _reportParameters.SearchTerm??""}
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

        public IEnumerable<SearchUser> Search(string searchBy, bool isSuper)
        {
            List<SearchUser> items = new List<SearchUser>();

            var sqlParameters = new SqlParameter[] {
                new SqlParameter(){ParameterName= "@SearchBy", Value= searchBy.Replace(" ","")},
                new SqlParameter(){ParameterName= "@IsSuper", Value= isSuper}
            };

            var list = _context.SearchUser
                .FromSqlRaw($"EXECUTE dbo.spGetUserByName @SearchBy, @IsSuper", sqlParameters)
                .ToList();

            foreach (var user in list)
            {
                items.Add(new SearchUser { EIN = user.EIN, Name = user.Name });
            }
            return items;
        }

        public async Task<GetUserByEINDto> GetUserByEINAsync(string ein, bool isSuper)
        {
            var sqlParameters = new SqlParameter[] {
                new SqlParameter(){ParameterName= "@EIN", Value= ein},
                new SqlParameter(){ParameterName= "@IsSuper", Value= isSuper}
            };

            var list = _context.GetUserByEIN
                .FromSqlRaw($"EXECUTE dbo.spGetUserByEIN @EIN, @IsSuper", sqlParameters)
                .ToList();

            foreach (var user in list)
            {
                GetUserByEINDto getUserByEINDto = _mapper.Map<GetUserByEINDto>(user);

                getUserByEINDto.UsersGroups = (await _groupRepository.GetAsync(ein)).Select(x => x.GroupID).ToList();

                if (user.RCs != null && user.RCs.Length > 0)
                    getUserByEINDto.RCs = new List<string>(user.RCs.ToString().Split(','));

                if (user.DPs != null && user.DPs.Length > 0)
                    getUserByEINDto.DPs = new List<string>(user.DPs.ToString().Split(','));

                if (getUserByEINDto.IsSuper == null)
                    getUserByEINDto.IsSuper = false;

                return getUserByEINDto;
            }
            return null;
        }

        public bool Add(UserDtoToAddAndUpdate user)
        {
            SqlParameter[] sqlParameters = new SqlParameter[] {
                                new SqlParameter("@result", System.Data.SqlDbType.Int){Direction = System.Data.ParameterDirection.Output},
                                new SqlParameter("@LanID", user.LanID){},
                                new SqlParameter("@RoleID", user.RoleID){},
                                new SqlParameter("@EIN", user.EIN){},
                                new SqlParameter("@FirstName", user.FirstName){},
                                new SqlParameter("@LastName", user.LastName){},
                                new SqlParameter("@EmailAddress", user.EmailAddress){},
                                new SqlParameter("@CreatedBy", UserSession.Instance.User.UserID){},
                                new SqlParameter("@RC", string.Join(",", user.RCs)){},
                                new SqlParameter("@DP", string.Join(",", user.DPs)){},
                                new SqlParameter("@Groups", string.Join(",", user.UsersGroups)){},
                                new SqlParameter("@IsSuper", user.IsSuper){}
            };

            _context.Database.ExecuteSqlRaw($"EXECUTE @result = dbo.spCreateUser " +
                $"@LanID, @RoleID, @EIN, @FirstName, @LastName, @EmailAddress, " +
                $"@CreatedBy, @RC, @DP, @Groups, @IsSuper", sqlParameters);

            return (int)sqlParameters[0].Value >= 0;
        }

        public bool Update(UserDtoToAddAndUpdate user)
        {
            SqlParameter[] sqlParameters = new SqlParameter[] {
                                new SqlParameter("@result", System.Data.SqlDbType.Int){Direction = System.Data.ParameterDirection.Output},
                                new SqlParameter("@UserID", user.UserID){},
                                new SqlParameter("@LanID", user.LanID){},
                                new SqlParameter("@RoleID", user.RoleID){},
                                new SqlParameter("@EIN", user.EIN){},
                                new SqlParameter("@FirstName", user.FirstName){},
                                new SqlParameter("@LastName", user.LastName){},
                                new SqlParameter("@EmailAddress", user.EmailAddress){},
                                new SqlParameter("@UpdatedBy", UserSession.Instance.User.UserID){},
                                new SqlParameter("@RC", string.Join(",", user.RCs)){},
                                new SqlParameter("@DP", string.Join(",", user.DPs)){},
                                new SqlParameter("@Groups", string.Join(",", user.UsersGroups)){}
            };

            _context.Database.ExecuteSqlRaw($"EXECUTE @result = dbo.spUpdateUser " +
                $"@UserID, @LanID, @RoleID, @EIN, @FirstName, @LastName, @EmailAddress, " +
                $"@UpdatedBy, @RC, @DP, @Groups", sqlParameters);

            return (int)sqlParameters[0].Value >= 0;
        }

        public bool Delete(string userID)
        {
            SqlParameter[] sqlParameters = new SqlParameter[] {
                                new SqlParameter("@result", System.Data.SqlDbType.Int){Direction = System.Data.ParameterDirection.Output},
                                new SqlParameter("@UserID", userID){},
                                new SqlParameter("@UpdatedBy", UserSession.Instance.User.UserID){}
            };

            _context.Database.ExecuteSqlRaw($"EXECUTE @result =  dbo.spDeleteUser " +
                $"@UserID, @UpdatedBy", sqlParameters);

            return (int)sqlParameters[0].Value >= 0;
        }

        public bool IsDeveloper(string lanID)
        {
            var sqlParameters = new SqlParameter[] {
                new SqlParameter("@LanID", lanID),
                new SqlParameter("@IsDeveloper", System.Data.SqlDbType.Bit){
                    Direction = System.Data.ParameterDirection.Output
                }
            };

            _context.Database.ExecuteSqlRaw($"EXECUTE dbo.spIsDeveloper_new @LanID, @IsDeveloper OUTPUT", sqlParameters);

            return (bool)sqlParameters[1].Value;
        }
    }
}