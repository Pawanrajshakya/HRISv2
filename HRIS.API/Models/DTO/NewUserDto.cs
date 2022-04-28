using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public class UserDtoToAddAndUpdate
    {
        public string LanID { get; set; }
        public int RoleID { get; set; }
        public string EIN { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string UserID { get; set; }
        public string[] RCs { get; set; }
        public string[] DPs { get; set; }
        public int[] UsersGroups { get; set; }
        public bool IsSuper
        {
            get; set;
        }
    }
}
