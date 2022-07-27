using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public class EmployeeBehaviorDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
    public class EmployeeBehavior
    {
        [System.ComponentModel.DataAnnotations.Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
