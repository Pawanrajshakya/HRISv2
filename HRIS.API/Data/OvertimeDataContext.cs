using Microsoft.EntityFrameworkCore;

namespace HRIS.API
{
    public class OvertimeDataContext : DbContext
    {
        public OvertimeDataContext(DbContextOptions<OvertimeDataContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BudgetedOT>().HasKey(c => new { c.DBYear, c.DBDescription});
            modelBuilder.Entity<ActualOT>().HasKey(c => new { c.DBYear, c.DBDescription});
        }

        public DbSet<StaffOvertimeSummary> StaffOvertimeSummaries { get; set; }
        public DbSet<BudgetedOT> BudgetedOTs { get; set; }
        public DbSet<ActualOT> ActualOTs { get; set; }
        public DbSet<OvertimeReport> OvertimeReports { get; set; }
        public DbSet<OvertimeEarnedAnalysisReport> OvertimeEarnedAnalysisReports { get; set; }
        public DbSet<HRISFiscalYear> HRISFiscalYears { get; set; }
    }
}
