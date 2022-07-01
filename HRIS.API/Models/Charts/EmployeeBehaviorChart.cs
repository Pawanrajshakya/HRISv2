using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public class EmployeeBehaviorChart
    {
        [System.ComponentModel.DataAnnotations.Key]
        public string IssueCodeName { get; set; }
        public int IssueCodeNameCount { get; set; }
        public string Date { get; set; }
        public string Year { get; set; }
        public string Month { get; set; }
        public string Week { get; set; }
    }
}
