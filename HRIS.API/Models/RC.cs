using System.ComponentModel.DataAnnotations;

namespace HRIS.API
{
    public class RC
    {
        [Key]
        public string Code { get; set; }
        public string Description { get; set; }
    }
}
