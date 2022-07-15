using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public class EDUChartDto
    {
        public string Description { get; set; }
        public int Count { get; set; }
        public int Percentage { get; set; }
        public string Year { get; set; }
    }
}
