using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API.Models.DTO
{
    public class UserGroupDto
    {
        public string UserID { get; set; }
        public int GroupID { get; set; }
        public string Description { get; set; }
    }
}
