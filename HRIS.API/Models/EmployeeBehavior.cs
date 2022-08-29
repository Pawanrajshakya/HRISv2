using System.ComponentModel.DataAnnotations;

namespace HRIS.API
{
    public class EmployeeBehaviorDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
    public class EmployeeBehavior
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
