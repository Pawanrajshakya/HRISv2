using Microsoft.EntityFrameworkCore;

namespace HRIS.API
{
    public class HRISDataContext : DbContext
    {
        public HRISDataContext(DbContextOptions<HRISDataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserGroup>().HasKey(ug => new { ug.UserID, ug.GroupID });

            modelBuilder.Entity<SeparationSummary>().HasKey(c => new { c.ReasonDesc, c.Month });

            modelBuilder.Entity<UserGroup>()
                .HasOne<HRISUser>(x => x.User)
                .WithMany(x => x.UsersGroups)
                .HasForeignKey(x => x.UserID);

            modelBuilder.Entity<UserGroup>()
                .HasOne<Group>(x => x.Group)
                .WithMany(x => x.UsersGroups)
                .HasForeignKey(x => x.GroupID);
        }

        public DbSet<LoginUser> LoginUser { get; set; }
        public DbSet<HRISUser> HRISUsers { get; set; }
        public DbSet<UserList> UserList { get; set; }
        public DbSet<GetUserByEIN> GetUserByEIN { get; set; }
        public DbSet<SearchUser> SearchUser { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<UserGroup> UsersGroups { get; set; }
        public DbSet<RC> RC { get; set; }
        public DbSet<DP> DP { get; set; }
        public DbSet<Location> Location { get; set; }
        public DbSet<AnnouncementList> AnnouncementList { get; set; }
        public DbSet<Announcement> Announcement { get; set; }
        public DbSet<AnnouncementSummary> AnnouncementSummary { get; set; }
        public DbSet<AgencyHeadcountChart> AgencyHeadcountChart { get; set; }
        public DbSet<Title> Titles { get; set; }
        public DbSet<CSStatus> CSStatuses { get; set; }
        public DbSet<LeaveStatus> LeaveStatuses{ get; set; }
        public DbSet<RetirementResignationFMLA> RetirementResignationFMLAs { get; set; }
        public DbSet<ActiveStaff> ActiveStaffs { get; set; }
        public DbSet<EmployeeBehavior> EmployeeBehaviors { get; set; }
        public DbSet<StaffDetail> StaffDetails { get; set; }
        public DbSet<StaffEmergencyContactInfo> EmergencyContactInfos { get; set; }
        //spGetPagedStaffsOnLeave
        public DbSet<StaffLeaveReport> StaffLeaveReports  { get; set; }
        public DbSet<StaffEmergencyContactInfoReport> StaffEmergencyContactInfoReports { get; set; }
        public DbSet<VacationRosterReport> VacationRosterReports { get; set; }
        public DbSet<SeparationSummary> SeparationSummaries { get; set; }
        public DbSet<PARReport> PARReports { get; set; }
        public DbSet<PARDetail> PARDetails { get; set; }
        public DbSet<OvertimeCitytimeReport> OvertimeCitytimeReports { get; set; }

        public DbSet<HeadcountReport> HeadcountReports { get; set; }
        public DbSet<HeadCountTitleSummaryReport> HeadCountTitleSummaryReports { get; set; }
        public DbSet<HeadcountTitleAndBudgetReconciliationSummaryReport> HeadCountTitleAndBudgetReconciliationSummaryReports { get; set; }
        public DbSet<HeadcountTitleAndBudgetSummaryReport> HeadCountTitleAndBudgetSummaryReports { get; set; }
        public DbSet<HeadcountPMSEmployeeDetailReport> HeadcountPMSEmployeeDetailReports { get; set; }

        public DbSet<EEOChart> EEOCharts { get; set; }
    }
}