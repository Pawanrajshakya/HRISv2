using Microsoft.EntityFrameworkCore;

namespace HRIS.API
{
    public class OvertimeDataContext : DbContext
    {
        public OvertimeDataContext(DbContextOptions<OvertimeDataContext> options) : base(options)
        {
        }

        public DbSet<StaffOvertimeSummary> StaffOvertimeSummaries { get; set; }
    }
}
