using Microsoft.EntityFrameworkCore;

namespace HRIS.API
{
    public class GDSDataContext : DbContext
    {
        public GDSDataContext(DbContextOptions<GDSDataContext> options) : base(options)
        {
        }

        public DbSet<EcardChart> EcardCharts { get; set; }

        public DbSet<EEOChart> EEOCharts { get; set; }
        public DbSet<EEOConfirmedReport> EEOConfirmedReports { get; set; }
        public DbSet<EEOPendingReport> EEOPendingReports { get; set; }
        public DbSet<EEOSummaryReport> EEOSummaryReports { get; set; }
    }
}
