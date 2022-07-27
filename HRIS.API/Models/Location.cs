using System.ComponentModel.DataAnnotations;

namespace HRIS.API
{
    public class LocationDto
    {
        public string Code { get; set; }
        public string Description { get; set; }
        public string RCs { get; set; }
    }

    public class Location
    {
        [Key]
        public string Code { get; set; }
        public string Description { get; set; }
        public string RCs { get; set; }
    }
}
