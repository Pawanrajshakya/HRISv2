namespace HRIS.API
{
    public class StaffOvertimeSummaryDto
    {
        public string CalendarORFiscal { get; set; }
        public string Salary { get; set; }
        public string AdComp { get; set; }
        public decimal SumNightDifferentialYTD { get; set; }
        public decimal TotBasePay { get; set; }
        public string OT_YTDAmt { get; set; }
        public string OT_YTDHrs { get; set; }
        public decimal TotBasePlusOT { get; set; }
        public decimal SumNightDifferentialPerm { get; set; }
        public string CompYTD { get; set; }
        public string WaiverStatus { get; set; }
        public string WaiverPrcnt { get; set; }
        public decimal WaiverAmt { get; set; }
        public float OTPercentofBaseSalary { get; set; }
        public float OTPcntRemainingNew { get; set; }
        public string Blocked { get; set; }
        public decimal POSOrNegCap { get; set; }
        public float Bal_Allowed { get; set; }
        public string FLSA { get; set; }
        public string NonFLSACompTimeBal { get; set; }
        public string FLSACompTimeBal { get; set; }
        public string HourlyRate { get; set; }
        public float WorkweekHours { get; set; }
        public float HrsWrkdThisPeriod { get; set; }
    }
}
