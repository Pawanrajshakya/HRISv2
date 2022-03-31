using Microsoft.EntityFrameworkCore;

namespace HRIS.API
{
    public class GDSDataContext: DbContext
    {
        public GDSDataContext(DbContextOptions<GDSDataContext> options) : base(options)
        {
        }

        public DbSet<EcardChart> EcardCharts { get; set; }
    }
}
