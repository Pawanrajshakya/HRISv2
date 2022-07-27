namespace HRIS.API
{
    public class RetirementResignationFMLADto
    {
        public int RowNum { get; set; }
        public string Date { get; set; }
        public string MonthYear { get; set; }
        public int Retirement { get; set; }
        public int FMLA { get; set; }
        public int Resignation { get; set; }
        public int OtherSeparation { get; set; }
    }
    public class RetirementResignationFMLA
    {
        [System.ComponentModel.DataAnnotations.Key]
        public int RowNum { get; set; }
        public string Date { get; set; }
        public string MonthYear { get; set; }
        public int Retirement { get; set; }
        public int FMLA { get; set; }
        public int Resignation { get; set; }
        public int OtherSeparation { get; set; }
    }
}
