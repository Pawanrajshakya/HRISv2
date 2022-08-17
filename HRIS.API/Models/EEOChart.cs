using System;
using System.ComponentModel.DataAnnotations;

namespace HRIS.API
{
    public class EEOChart
    {
        [Key]
        public string Labels { get; set; }
        public int Data { get; set; }
        public string Title { get; set; }
    }

    public class EEOChartDto
    {
        public string Labels { get; set; }
        public int Data { get; set; }
        public string Title { get; set; }
    }

    //EEOSummaryData //HRIS_eeo_spGetSummarydataByRC_Report_JanJuly
    public class EEOSummaryReport
    {
        public int Total { get; set; }
        [Key]
        public Int64 RowNum { get; set; }
        public string RC { get; set; }
        public string RCName { get; set; }
        public int ActiveEmployees { get; set; }
        public int CountThatHadConfirmation { get; set; }
        public int PercentConfirmed { get; set; }
    }

    public class EEOSummaryReportDto
    {
        public int Total { get; set; }
        public Int64 RowNum { get; set; }
        public string RC { get; set; }
        public string RCName { get; set; }
        public int ActiveEmployees { get; set; }
        public int CountThatHadConfirmation { get; set; }
        public int PercentConfirmed { get; set; }
    }

    //EEOPendingSurveyData //HRIS_eeo_spGetPendingSurveyData_ByRA_final_Report_JanJuly
    public class EEOPendingReport
    {
        public int Total { get; set; }
        [Key]
        public Int64 RowNum { get; set; }
        public string RA { get; set; }
        public string RC { get; set; }
        public string RCName { get; set; }
        public string DPCode { get; set; }
        public string DPName { get; set; }
        public string EIN { get; set; }
        public string Name { get; set; }
        public string PreferredEmployeeName { get; set; }
        public string SupervisorEIN { get; set; }
        public string SupervisorName { get; set; }
        public string PreferredSupervisorName { get; set; }
        public string SupervisorEmail { get; set; }
    }

    public class EEOPendingReportDto
    {
        public int Total { get; set; }
        public Int64 RowNum { get; set; }
        public string RA { get; set; }
        public string RC { get; set; }
        public string RCName { get; set; }
        public string DPCode { get; set; }
        public string DPName { get; set; }
        public string EIN { get; set; }
        public string Name { get; set; }
        public string PreferredEmployeeName { get; set; }
        public string SupervisorEIN { get; set; }
        public string SupervisorName { get; set; }
        public string PreferredSupervisorName { get; set; }
        public string SupervisorEmail { get; set; }
    }

    //EEOSurveyData  //HRIS_eeo_spGetSurveyData_Confirmed6mthsbyRA_final_Report_JanJuly
    public class EEOConfirmedReport
    {
        public int Total { get; set; }
        [Key]
        public Int64 RowNum { get; set; }
        public string RC { get; set; }
        public string RCName { get; set; }
        public string DPCode { get; set; }
        public string DPName { get; set; }
        public string Name { get; set; }
        public string PreferredEmployeeName { get; set; }
        public string Confirmation { get; set; }
        public string ConfirmedBy { get; set; }
        public string ConfirmedDate { get; set; }
        public string SupervisorEIN { get; set; }
        public string SupervisorName { get; set; }
        public string PreferredSupervisorName { get; set; }
    }

    public class EEOConfirmedReportDto
    {
        public int Total { get; set; }
        public Int64 RowNum { get; set; }
        public string RC { get; set; }
        public string RCName { get; set; }
        public string DPCode { get; set; }
        public string DPName { get; set; }
        public string Name { get; set; }
        public string PreferredEmployeeName { get; set; }
        public string Confirmation { get; set; }
        public string ConfirmedBy { get; set; }
        public string ConfirmedDate { get; set; }
        public string SupervisorEIN { get; set; }
        public string SupervisorName { get; set; }
        public string PreferredSupervisorName { get; set; }
    }
}
