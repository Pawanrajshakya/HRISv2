using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public class EDUChart
    {
        [Key]
        public string Description { get; set; }
        public int Count { get; set; }
        public int Percentage { get; set; }
        public string Year { get; set; }
    }
}
