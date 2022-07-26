﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IUserRepository
    {
        public Task<UserDto> GetUserByLanIDAsync(string lanID);
        public UserDto GetByLanID(string lanID);
        public Task<GetUserByEINDto> GetByEINAsync(string ein, bool isSuper);
        //public Task<IEnumerable<UserDto>> Get(int roleID, int groupID);
        public IEnumerable<UserListDto> GetUsers(string userID, Pagination _reportParameters);
        public Task<IEnumerable<SearchUser>> SearchAsync(string searchBy, bool isSuper);
        public bool Add(UserDtoToAddAndUpdate user);
        public bool Update(UserDtoToAddAndUpdate user);
        public bool Delete(string userID);
        public Task<bool> IsDeveloperAsync(string lanID);
        public Task<bool> FindAsync(string ein);
    }
    public class UserRepository : Repository, IUserRepository
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IRoleRepository _roleRepository;

        public UserRepository(HRISDataContext context
            , IMapper mapper
            , IGroupRepository groupRepository
            , IRoleRepository roleRepository)
        {
            _groupRepository = groupRepository;
            _roleRepository = roleRepository;
            _mapper = mapper;
            _context = context;

        }

        //public IEnumerable<UserDto> Get(int roleID, int groupID)
        //{
        //    var query = _context.HRISUsers
        //        .Where(x => x.IsVisible == true)
        //        .Where(x => x.RoleID == ((roleID == 0) ? x.RoleID : roleID));

        //    return query.ProjectTo<UserDto>(_mapper.ConfigurationProvider).ToList();

        //}

        public async Task<UserDto> GetUserByLanIDAsync(string lanID)
        {
            var sqlParameters = new SqlParameter[] { new SqlParameter("@LanID", lanID) };

            LoginUser user = _context.LoginUser
                .FromSqlRaw($"EXECUTE dbo.spGetUser @LanID", sqlParameters).ToList()
                .Where(x => x.LanID == lanID)
                .SingleOrDefault();

            if (user == null)
                return null;

            var dto = _mapper.Map<UserDto>(user);

            dto.RoleDescription = (await _roleRepository.GetByIDAsync(dto.RoleID)).Description;
            dto.Groups = (await _groupRepository.GetByUserIDAsync(dto.UserID)).Select(x => x.GroupID).ToArray();

            return await Task.Run(() => dto);
        }

        public IEnumerable<UserListDto> GetUsers(string userID, Pagination _reportParameters)
        {
            List<UserListDto> dto = new List<UserListDto>();

            var sqlParameters = new SqlParameter[] {
                new SqlParameter("@UserID", userID),
                new SqlParameter("@PageNumber", _reportParameters.PageNumber ),
                new SqlParameter("@PageSize", _reportParameters.PageSize),
                new SqlParameter("@SortColumn", _reportParameters.SortColumn??""),
                new SqlParameter("@SortOrder", _reportParameters.SortOrder??""),
                new SqlParameter("@SearchTerm", _reportParameters.SearchTerm??"")
            };

            var rows = _context.UserList
                .FromSqlRaw($"EXECUTE dbo.spGetPagedUsers @UserID, @PageNumber, @PageSize, @SortColumn, @SortOrder, @SearchTerm", sqlParameters)
                .ToList();

            foreach (var row in rows)
            {
                dto.Add(_mapper.Map<UserListDto>(row));
            }
            return dto;
        }

        public async Task<IEnumerable<SearchUser>> SearchAsync(string searchBy, bool isSuper)
        {
            try
            {
                var sqlParameters = new SqlParameter[] {
                new SqlParameter("@SearchBy", searchBy.Replace(" ","")),
                new SqlParameter("@IsSuper",isSuper)};

                List<SearchUser> users = _context.SearchUser
                    .FromSqlRaw($"EXECUTE dbo.spGetUserByName @SearchBy, @IsSuper", sqlParameters)
                    .ToList();

                return await Task.Run(() => users);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        public async Task<GetUserByEINDto> GetByEINAsync(string ein, bool isSuper)
        {
            try
            {
                var sqlParameters = new SqlParameter[] {
                new SqlParameter("@EIN", ein),
                new SqlParameter("@IsSuper",isSuper)};

                var list = _context.GetUserByEIN
                    .FromSqlRaw($"EXECUTE dbo.spGetUserByEIN @EIN, @IsSuper", sqlParameters)
                    .ToList();

                foreach (var user in list)
                {
                    GetUserByEINDto getUserByEINDto = _mapper.Map<GetUserByEINDto>(user);

                    getUserByEINDto.UsersGroups = (await _groupRepository.GetByUserIDAsync(ein)).Select(x => x.GroupID).ToList();

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
            catch (Exception ex)
            {
                throw ex;
            }
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

        public async Task<bool> IsDeveloperAsync(string lanID)
        {
            var sqlParameters = new SqlParameter[] {
                new SqlParameter("@LanID", lanID),
                new SqlParameter("@IsDeveloper", System.Data.SqlDbType.Bit){
                    Direction = System.Data.ParameterDirection.Output
                }
            };

            await _context.Database.ExecuteSqlRawAsync($"EXECUTE dbo.spIsDeveloper_V2 @LanID, @IsDeveloper OUTPUT", sqlParameters);

            return await Task.Run(() => (bool)sqlParameters[1].Value);
        }

        public UserDto GetByLanID(string lanID)
        {
            try
            {
                var sqlParameters = new SqlParameter[] {
                new SqlParameter("@LanID", lanID)
            };

                var users = _context.LoginUser
                    .FromSqlRaw($"EXECUTE dbo.spGetUser @LanID", sqlParameters);

                var user = users.ToList()
                    .Where(x => x.LanID == lanID)
                    .SingleOrDefault();

                if (user == null)
                    return null;

                var dto = _mapper.Map<UserDto>(user);

                dto.Groups = _groupRepository.GetByUserID(dto.UserID).Select(x => x.GroupID).ToArray();

                return dto;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<bool> FindAsync(string ein)
        {
            try
            {
                var found = _context.HRISUsers.Count(x => x.EIN == ein) > 0;

                return await Task.Run(() => found);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}