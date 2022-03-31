using System.ComponentModel.DataAnnotations;

namespace HRIS.API
{
    public class UserList
    {
        public int Total { get; set; }
        [Key]
        public long RowNum { get; set; }
        public string LanID { get; set; }
        public int RoleID { get; set; }
        public string RoleDesc { get; set; }
        public string EIN { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string Groups { get; set; }
        public bool? IsSuper { get; set; }
    }
}
