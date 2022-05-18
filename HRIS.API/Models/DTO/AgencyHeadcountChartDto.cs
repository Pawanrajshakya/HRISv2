using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public class AgencyHeadcountChartDto
    {
        public int RowNum { get; set; }
        public string Period { get; set; }
        public int Vacancy { get; set; }
        public int BudgetedHeadcount { get; set; }
        public int ActiveStaff { get; set; }
    }
}
