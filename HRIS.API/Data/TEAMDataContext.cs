using Microsoft.EntityFrameworkCore;

namespace HRIS.API
{
    public class TEAMDataContext : DbContext
    {
        public TEAMDataContext(DbContextOptions<TEAMDataContext> options) 
            : base(options)
        {
        }

        public DbSet<Team_PendingCasesChart> Team_PendingCasesChart{ get; set; }
    }
}
