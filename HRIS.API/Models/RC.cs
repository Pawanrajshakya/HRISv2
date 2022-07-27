using System.ComponentModel.DataAnnotations;

namespace HRIS.API
{
    public class RCDto
    {
        public string Code { get; set; }
        public string Description { get; set; }
    }
    public class RC
    {
        [Key]
        public string Code { get; set; }
        public string Description { get; set; }
    }
}
