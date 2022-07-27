using System.ComponentModel.DataAnnotations;

namespace HRIS.API
{
    public class AgencySeparationChart
    {
        [Key]
        public string Description { get; set; }
        public int Total { get; set; }
    }
}
