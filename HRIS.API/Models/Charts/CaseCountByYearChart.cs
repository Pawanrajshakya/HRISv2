using System.ComponentModel.DataAnnotations;

namespace HRIS.API
{
    public class CaseCountByYearChart
    {
        public string Flag { get; set; }
        public int Count { get; set; }
        public int Year { get; set; }
    }
}
