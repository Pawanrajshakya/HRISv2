using System.ComponentModel.DataAnnotations;

namespace HRIS.API
{
    public class SeparationSummaryDto
    {
        public string ReasonDesc { get; set; }
        public int Month { get; set; }
        public string MonthName { get; set; }
        public int Year { get; set; }
        public int Count { get; set; }
        public string Title { get; set; }
    }

    public class SeparationSummary
    {
        [Key]
        public string ReasonDesc { get; set; }
        public int Month { get; set; }
        public string MonthName { get; set; }
        public int Year { get; set; }
        public int Count { get; set; }
        public string Title { get; set; }
    }
}
