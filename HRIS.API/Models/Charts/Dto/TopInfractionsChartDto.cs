using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public class TopInfractionsChartDto
    {
        public string GroupDescription { get; set; }
        public int Count { get; set; }
        public decimal Percentage { get; set; }
    }
}
