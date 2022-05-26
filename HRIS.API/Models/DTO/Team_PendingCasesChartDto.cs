using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public class Team_PendingCasesChartDto
    {
        public int Order { get; set; }
        public string GroupDescription { get; set; }
        public int Count { get; set; }
    }
}
