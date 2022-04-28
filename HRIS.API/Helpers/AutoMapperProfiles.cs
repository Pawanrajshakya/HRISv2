using AutoMapper;

namespace HRIS.API
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<LoginUser, UserDto>();

            CreateMap<HRISUser, UserDto>()
                .ForMember(x => x.UserGroups, y => y.MapFrom(z => z.UsersGroups))
                .AfterMap((s, d) =>
                {
                    foreach (var i in d.UserGroups)
                    {
                        i.UserID = s.UserID;
                    }
                });

            CreateMap<UserList, UserListDto>();

            CreateMap<GetUserByEIN, GetUserByEINDto>()
                .ForMember(x => x.RCs, y => y.Ignore())
                .ForMember(x => x.DPs, y => y.Ignore());

            CreateMap<Role, RoleDto>();

            CreateMap<Group, GroupDto>();
            
            CreateMap<UserGroup, UserGroupDto>()
                .ForMember(x => x.Description, y => y.MapFrom(z => z.Group.GroupDescription))
                .AfterMap((s, d) => { s.GroupID = d.GroupID; });

            CreateMap<RC, RCDto>();
            CreateMap<DP, DPDto>();

            CreateMap<EcardChart, EcardChartDto>();

        }
    }
}
