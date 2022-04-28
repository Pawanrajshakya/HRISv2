using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HRIS.API
{
    public class GetUserByEINDto
    {
        [Key]
        public string UserID { get; set; }
        public string LanID { get; set; }
        public int RoleID { get; set; }
        public string EIN { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public bool? IsHRISUser { get; set; }
        public DateTime? LastAccess { get; set; }
        public List<string> RCs { get; set; }
        public List<string> DPs { get; set; }
        public string Agency { get; set; }
        public bool? IsDHSUser { get; set; }
        public bool? IsSuper
        {
            get; set;
        }
        public virtual IList<int> UsersGroups { get; set; }
    }
}
