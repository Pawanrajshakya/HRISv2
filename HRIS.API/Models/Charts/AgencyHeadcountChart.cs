using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public class AgencyHeadcountChart
    {
        [Key]
        public int RowNum { get; set; }
        public string Period { get; set; }
        public int Vacancy { get; set; }
        public int BudgetedHeadcount { get; set; }
        public int ActiveStaff { get; set; }
    }
}
