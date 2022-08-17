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
            CreateMap<StaffLeaveReport, StaffLeaveReportDto>();
            CreateMap<StaffEmergencyContactInfoReport, StaffEmergencyContactInfoReportDto>();
            CreateMap<VacationRosterReport, VacationRosterReportDto>();
            CreateMap<SeparationSummary, SeparationSummaryDto>();

            CreateMap<PARReport, PARReportDto>();
            CreateMap<PARDetail, PARDetailDto>();

            #region Overtime
            CreateMap<ActualOT, ActualOTDto>();
            CreateMap<BudgetedOT, BudgetedOTDto>();
            CreateMap<OvertimeReport, OvertimeReportDto>()
                .ForMember(x => x.DPCode, y => y.MapFrom(z => z.DP_Code))
                .ForMember(x => x.RowNum, y => y.MapFrom(z => z.RowNumber));

            CreateMap<OvertimeEarnedAnalysisReport, OvertimeEarnedAnalysisReportDto>()
                .ForMember(x => x.Description, y => y.MapFrom(z => z.RarcDesc))
                .ForMember(x => x.Jan, y => y.MapFrom(z => z.January))
                .ForMember(x => x.Feb, y => y.MapFrom(z => z.February))
                .ForMember(x => x.Mar, y => y.MapFrom(z => z.March))
                .ForMember(x => x.Apr, y => y.MapFrom(z => z.April))
                .ForMember(x => x.Jun, y => y.MapFrom(z => z.June))
                .ForMember(x => x.Jul, y => y.MapFrom(z => z.July))
                .ForMember(x => x.Aug, y => y.MapFrom(z => z.August))
                .ForMember(x => x.Sep, y => y.MapFrom(z => z.September))
                .ForMember(x => x.Oct, y => y.MapFrom(z => z.October))
                .ForMember(x => x.Nov, y => y.MapFrom(z => z.November))
                .ForMember(x => x.Dec, y => y.MapFrom(z => z.December));

            CreateMap<OvertimeCitytimeReport, OvertimeCitytimeReportDto>();
            #endregion

            #region headcount
            CreateMap<AgencyHeadcountChart, AgencyHeadcountChartDto>();
            CreateMap<HeadcountReport, HeadcountReportDto>();
            CreateMap<HeadCountTitleSummaryReport, HeadcountTitleSummaryReportDto>();
            CreateMap<HeadcountTitleAndBudgetReconciliationSummaryReport, HeadcountTitleAndBudgetReconciliationSummaryReportDto>();
            CreateMap<HeadcountTitleAndBudgetSummaryReport, HeadcountTitleAndBudgetSummaryReportDto>();
            CreateMap<HeadcountPMSEmployeeDetailReport, HeadcountPMSEmployeeDetailReportDto>();
            #endregion

            #region EEO
            CreateMap<EEOChart, EEOChartDto>();
            CreateMap<EEOConfirmedReport, EEOConfirmedReportDto>();
            CreateMap<EEOPendingReport, EEOPendingReportDto>();
            CreateMap<EEOSummaryReport, EEOSummaryReportDto>();
            #endregion
        }
    }
}
