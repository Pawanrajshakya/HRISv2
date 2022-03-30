using HRIS.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API.Data
{
    public class GDSDataContext: DbContext
    {
        public GDSDataContext(DbContextOptions<GDSDataContext> options) : base(options)
        {
        }

        public DbSet<EcardChart> EcardCharts { get; set; }
    }
}
