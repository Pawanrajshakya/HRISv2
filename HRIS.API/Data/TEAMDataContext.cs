using Microsoft.EntityFrameworkCore;

namespace HRIS.API
{
    public class TEAMDataContext : DbContext
    {
        public TEAMDataContext(DbContextOptions<TEAMDataContext> options)
            : base(options)
        {
        }

        public DbSet<PendingCasesChart> PendingCasesChart { get; set; }
        public DbSet<CaseCountByYearChart> CaseCountByYearChart { get; set; }
        public DbSet<TopInfractionsChart> TopInfractionsChart { get; set; }
        public DbSet<StaffEDUDetail> StaffEDUDetails { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CaseCountByYearChart>()
                .HasKey(x => new { x.Flag, x.Year });
        }
    }
}
