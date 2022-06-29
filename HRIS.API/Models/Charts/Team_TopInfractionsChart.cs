using System.ComponentModel.DataAnnotations;

namespace HRIS.API
{
    public class Team_TopInfractionsChart
    {
        [Key]
        public string GroupDescription { get; set; }
        public int Count { get; set; }
        public decimal Percentage { get; set; }
    }
}
