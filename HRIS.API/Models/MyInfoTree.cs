using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HRIS.API
{
    public class MyInfoTree
    {
        //public int Level { get; set; }
        public string EIN { get; set; }
        public string Name { get; set; }
        //public string SupervisorEIN { get; set; }
        public int EmployeesCount { get; set; }

    }

    public class MyInfoTreeDto
    {
        public MyInfoTreeDto()
        {
            Children = new List<MyInfoTreeDto>();
        }
        //public int Level { get; set; }
        public string EIN { get; set; }
        public string Name { get; set; }
        //public string SupervisorEIN { get; set; }
        public int EmployeesCount { get; set; }

        public List<MyInfoTreeDto> Children { get; set; }
    }
}
