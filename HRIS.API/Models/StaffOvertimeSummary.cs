using System;
using System.ComponentModel.DataAnnotations;

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
        public double OTPercentofBaseSalary { get; set; }
        public double OTPcntRemainingNew { get; set; }
        public string Blocked { get; set; }
        public decimal POSOrNegCap { get; set; }
        public double Bal_Allowed { get; set; }
        public string FLSA { get; set; }
        public string NonFLSACompTimeBal { get; set; }
        public string FLSACompTimeBal { get; set; }
        public string HourlyRate { get; set; }
        public double WorkweekHours { get; set; }
        public double HrsWrkdThisPeriod { get; set; }
    }

    public class StaffOvertimeSummary
    {
        [Key]
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
        public double OTPercentofBaseSalary { get; set; }
        public double OTPcntRemainingNew { get; set; }
        public string Blocked { get; set; }
        public decimal POSOrNegCap { get; set; }
        public double Bal_Allowed { get; set; }
        public string FLSA { get; set; }
        public string NonFLSACompTimeBal { get; set; }
        public string FLSACompTimeBal { get; set; }
        public string HourlyRate { get; set; }
        public double WorkweekHours { get; set; }
        public double HrsWrkdThisPeriod { get; set; }
    }

    public class BudgetedOTDto
    {
        public string Type { get; set; }
        public string DBDescription { get; set; }
        public int DBValue { get; set; }
        public int DBYear { get; set; }
        public int DBMonth { get; set; }
    }

    public class BudgetedOT
    {
        public string Type { get; set; }
        public string DBDescription { get; set; }
        public int DBValue { get; set; }
        public int DBYear { get; set; }
        public int DBMonth { get; set; }
    }

    public class ActualOTDto
    {
        public string Type { get; set; }
        public string DBDescription { get; set; }
        public int DBValue { get; set; }
        public int DBYear { get; set; }
        public int DBMonth { get; set; }
    }

    public class ActualOT
    {
        public string Type { get; set; }
        public string DBDescription { get; set; }
        public int DBValue { get; set; }
        public int DBYear { get; set; }
        public int DBMonth { get; set; }
    }

    public class OvertimeReportDto
    {
        public Int64 RowNum { get; set; }
        public int Total { get; set; }
        public string EIN { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }
        public string PreferredFirstName { get; set; }
        public string PreferredLastName { get; set; }
        public string RARC { get; set; }
        public string Title { get; set; }
        public string DPCode { get; set; }
        public decimal Salary { get; set; }
        public decimal AdComp { get; set; }
        public decimal OT_YTDAmt { get; set; }
        public string OT_YTDHrs { get; set; }
        public string CompYTD { get; set; }
        public string WaiverPrcnt { get; set; }
        public double OTPercentofBaseSalary { get; set; }
        public double OTPcntRemaining { get; set; }
        //public double OTPcntRemainingNew { get; set; }
        //public bool ShowPreferredColumns { get; set; }
    }

    public class OvertimeReport
    {
        [Key]
        public Int64 RowNumber { get; set; }
        public int Total { get; set; }
        public string EIN { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }
        public string PreferredFirstName { get; set; }
        public string PreferredLastName { get; set; }
        public string RARC { get; set; }
        public string Title { get; set; }
        public string DP_Code { get; set; }
        public decimal Salary { get; set; }
        public decimal AdComp { get; set; }
        public decimal OT_YTDAmt { get; set; }
        public string OT_YTDHrs { get; set; }
        public string CompYTD { get; set; }
        public string WaiverPrcnt { get; set; }
        public double OTPercentofBaseSalary { get; set; }
        public double OTPcntRemaining { get; set; }
        //public double? OTPcntRemainingNew { get; set; }
        //public bool ShowPreferredColumns { get; set; }
    }

    public class OvertimeEarnedAnalysisReport
    {
        [Key]
        public Int64 RowNum { get; set; }
        public int Total { get; set; }
        public string Rarc { get; set; }
        public string RarcDesc { get; set; }
        public decimal July { get; set; }
        public decimal August { get; set; }
        public decimal September { get; set; }
        public decimal October { get; set; }
        public decimal November { get; set; }
        public decimal December { get; set; }
        public decimal January { get; set; }
        public decimal February { get; set; }
        public decimal March { get; set; }
        public decimal April { get; set; }
        public decimal May { get; set; }
        public decimal June { get; set; }
        public decimal Monthly_Alloc { get; set; }
        public decimal FY_Alloc { get; set; }
        public decimal FYTD_Earned { get; set; }
        public decimal FYTD_Bal { get; set; }
        public decimal Project_Earned { get; set; }
        public decimal Project_Percent { get; set; }
        public decimal Project_Diff { get; set; }
    }

    public class OvertimeEarnedAnalysisReportDto
    {
        [Key]
        public Int64 RowNum { get; set; }
        public int Total { get; set; }
        public string Rarc { get; set; }
        public string Description { get; set; }
        public decimal Jul { get; set; }
        public decimal Aug { get; set; }
        public decimal Sep { get; set; }
        public decimal Oct { get; set; }
        public decimal Nov { get; set; }
        public decimal Dec { get; set; }
        public decimal Jan { get; set; }
        public decimal Feb { get; set; }
        public decimal Mar { get; set; }
        public decimal Apr { get; set; }
        public decimal May { get; set; }
        public decimal Jun { get; set; }
        public decimal Monthly_Alloc { get; set; }
        public decimal FY_Alloc { get; set; }
        public decimal FYTD_Earned { get; set; }
        public decimal FYTD_Bal { get; set; }
        public decimal Project_Earned { get; set; }
        public decimal Project_Percent { get; set; }
        public decimal Project_Diff { get; set; }
    }
}
