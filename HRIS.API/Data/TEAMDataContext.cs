using Microsoft.EntityFrameworkCore;

namespace HRIS.API
{
    public class TEAMDataContext : DbContext
    {
        public TEAMDataContext(DbContextOptions<TEAMDataContext> options)
            : base(options)
        {
        }

        public DbSet<TEAM_PendingCasesChart> Team_PendingCasesChart { get; set; }
        public DbSet<Team_CaseCountByYearChart> Team_CaseCountByYearChart { get; set; }
        public DbSet<Team_TopInfractionsChart> Team_TopInfractionsChart { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Team_CaseCountByYearChart>()
                .HasKey(x => new { x.Flag, x.Year });
        }
    }
}
