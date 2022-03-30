using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API.Models
{
    public class UserGroup
    {
        public User User { get; set; }
        public string UserID { get; set; }
        public Group Group { get; set; }
        public int GroupID { get; set; }
    }
}
