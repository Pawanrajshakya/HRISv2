using System;
using System.ComponentModel.DataAnnotations;

namespace HRIS.API
{
    public class GetUserByEIN
    {
        [Key]
        public string UserID { get; set; }
        public string LanID { get; set; }
        public int RoleID { get; set; }
        public string EIN { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public int? IsHRISUser { get; set; }
        public DateTime? LastAccess { get; set; }
        public string RCs { get; set; }
        public string DPs { get; set; }
        public string Agency { get; set; }
        public int? IsDHSUser { get; set; }
        public bool? IsSuper { get; set; }
    }
}
