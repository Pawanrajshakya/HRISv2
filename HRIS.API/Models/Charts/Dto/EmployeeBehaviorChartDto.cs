using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public class EmployeeBehaviorChartDto
    {
        public string Name { get; set; }
        public int Count { get; set; }
        public string Date { get; set; }
        public string Year { get; set; }
        public string Month { get; set; }
        public string Week { get; set; }
    }
}
