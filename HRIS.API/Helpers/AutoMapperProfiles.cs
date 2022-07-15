using AutoMapper;

namespace HRIS.API
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<LoginUser, UserDto>();

            CreateMap<HRISUser, UserDto>();
            //.ForMember(x => x.UserGroups, y => y.MapFrom(z => z.UsersGroups))
            //.AfterMap((s, d) =>
            //{
            //    foreach (var i in d.UserGroups)
            //    {
            //        i.UserID = s.UserID;
            //    }
            //});

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

            CreateMap<Announcement, AnnouncementDto>()
                .ForMember(x => x.Roles, y => y.Ignore());
            CreateMap<AnnouncementList, AnnouncementListDto>();
            CreateMap<AnnouncementSummary, AnnouncementSummaryDto>();

            CreateMap<AgencyHeadcountChart, AgencyHeadcountChartDto>();
            CreateMap<PendingCasesChart, PendingCasesChartDto>();
            CreateMap<CaseCountByYearChart, CaseCountByYearChartDto>();
            CreateMap<EDUChart, EDUChartDto>();
            CreateMap<TopInfractionsChart, TopInfractionsChartDto>();
            CreateMap<Location, LocationDto>();
            CreateMap<Title, TitleDto>();
            CreateMap<LeaveStatus, LeaveStatusDto>();
            CreateMap<RetirementResignationFMLA, RetirementResignationFMLADto>();
            CreateMap<CSStatus, CSStatusDto>();
            CreateMap<EmployeeBehaviorChart, EmployeeBehaviorChartDto>()
                .ForMember(x => x.Name, y => y.MapFrom(z => z.IssueCodeName))
                .ForMember(x => x.Count, y => y.MapFrom(z => z.IssueCodeNameCount));
            
            CreateMap<ActiveStaff, ActiveStaffDto>();

            CreateMap<StaffDetail, StaffDetailDto>();
            CreateMap<StaffEmergencyContactInfo, StaffEmergencyContactInfoDto>();
            CreateMap<StaffEDUDetail, StaffEDUDetailDto>();
            CreateMap<StaffOvertimeSummary, StaffOvertimeSummaryDto>();

        }
    }
}
