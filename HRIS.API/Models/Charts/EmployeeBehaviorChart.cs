namespace HRIS.API
{
    public class EmployeeBehaviorChart
    {
        [System.ComponentModel.DataAnnotations.Key]
        public string IssueCodeName { get; set; }
        public int IssueCodeNameCount { get; set; }
        public string Date { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public string Week { get; set; }
    }
}
