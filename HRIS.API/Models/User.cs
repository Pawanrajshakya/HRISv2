using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HRIS.API
{
    public class HRISUser
    {
        [Key]
        public string UserID { get; set; }
        public string LanID { get; set; }
        public int RoleID { get; set; }
        public Role Role { get; set; }
        public string EIN { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        //public DateTime? LastAccess { get; set; }
        //public bool IsHRISUser { get; set; }
        //public List<string> rcs { get; set; }
        //public List<string> dps { get; set; }
        //public bool IsTEAMSUser { get; set; }
        //public bool IsOvertimeUser { get; set; }
        public virtual IList<UserGroup> UsersGroups { get; set; }
        //public bool IsDeveloper { get; set; }
        //public string Agency { get; set; }
        //public bool IsDHSUser { get; set; }
        public bool? IsSuper { get; set; }
        public bool IsActive { get; set; }
        public bool IsVisible { get; set; }
    }

    public class LoginUser
    {
        [Key]
        public string UserID { get; set; }
        public string LanID { get; set; }
        public int RoleID { get; set; }
        public string EIN { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public DateTime? LastAccess { get; set; }
        public int IsHRISUser { get; set; }
        public string Agency { get; set; }
        public int IsDHSUser { get; set; }
    }
}
