using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
namespace HRIS.API
{
    public class RC
    {
        [Key]
        public string Code { get; set; }
        public string Description { get; set; }
    }
}
