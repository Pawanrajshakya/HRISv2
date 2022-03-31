using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public class UserDto
    {
        public string UserID { get; set; }
        public string LanID { get; set; }
        public int RoleID { get; set; }
        public string EIN { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public bool? IsSuper { get; set; }
        public RoleDto Role { get; set; }
        public List<UserGroupDto> UserGroups { get; set; }
    }

    //public class InternalUserDto
    //{
    //    public string UserID { get; set; }
    //    public string LanID { get; set; }
    //    public int RoleID { get; set; }
    //    public string EIN { get; set; }
    //    public string FirstName { get; set; }
    //    public string LastName { get; set; }
    //    public string EmailAddress { get; set; }
    //    public bool? IsSuper { get; set; }
    //    public ICollection<int> UserGroups { get; set; }

    //}
}
