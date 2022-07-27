using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public class UserGroupDto
    {
        public string UserID { get; set; }
        public int GroupID { get; set; }
        public string Description { get; set; }
    }
    public class UserGroup
    {
        public HRISUser User { get; set; }
        public string UserID { get; set; }
        public Group Group { get; set; }
        public int GroupID { get; set; }
    }
}
