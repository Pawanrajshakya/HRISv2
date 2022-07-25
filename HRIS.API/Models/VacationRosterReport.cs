using System;

namespace HRIS.API
{
    public class VacationRosterReportDto
    {
        public int Total { get; set; }
        public Int64 RowNum { get; set; }
        public string RC { get; set; }
        public string DP { get; set; }
        public string DPName { get; set; }
        public string LocationCode { get; set; }
        public string WorkAddress { get; set; }
        public string EIN { get; set; }
        public string EmpName { get; set; }
        public string LeaveStatus { get; set; }
        public string TitleCode { get; set; }
        public string TitleDescription { get; set; }
        public string TitleLevel { get; set; }
        public string SortLvl { get; set; }
        public string CSStatus { get; set; }
        public string ActionReason { get; set; }
        public string TitleDate { get; set; }
        public string LvlEntryDT { get; set; }
        public string JOSConv { get; set; }
        public string RankDate { get; set; }
        public string RankBy { get; set; }
        public decimal ListNo { get; set; }
        public string EXAM { get; set; }
        public string ExamDate { get; set; }
        public string SS { get; set; }
        public string UnionName { get; set; }
        public string AGY { get; set; }
        public int CountCheck { get; set; }
    }

    public class VacationRosterReport
    {
        public int Total { get; set; }
        [System.ComponentModel.DataAnnotations.Key]
        public Int64 RowNum { get; set; }
        public string RC { get; set; }
        public string DP { get; set; }
        public string DPName { get; set; }
        public string LocationCode { get; set; }
        public string WorkAddress { get; set; }
        public string EIN { get; set; }
        public string EmpName { get; set; }
        public string LeaveStatus { get; set; }
        public string TitleCode { get; set; }
        public string TitleDescription { get; set; }
        public string TitleLevel { get; set; }
        public string SortLvl { get; set; }
        public string CSStatus { get; set; }
        public string ActionReason { get; set; }
        public string TitleDate { get; set; }
        public string LvlEntryDT { get; set; }
        public string JOSConv { get; set; }
        public string RankDate { get; set; }
        public string RankBy { get; set; }
        public decimal ListNo { get; set; }
        public string EXAM { get; set; }
        public string ExamDate    { get; set; }
        public string SS  { get; set; }
        public string UnionName   { get; set; }
        public string AGY { get; set; }
        public int CountCheck { get; set; }
    }
}
