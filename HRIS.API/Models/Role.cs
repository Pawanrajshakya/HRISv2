using System.ComponentModel.DataAnnotations.Schema;

namespace HRIS.API
{
    public class RoleDto
    {
        public int RoleID { get; set; }
        public string Description { get; set; }
    }
    public class Role
    {
        public int RoleID { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public bool IsVisible { get; set; }
    }

    public enum _Role
    {
        HRS = 1,
        Chief = 2,
        RCHead = 3,
        HRBP = 4,
        Director = 5,
        Supervisor = 6,
    }
}
