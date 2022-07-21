using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public class StaffLeaveReportDto
    {
        public int Total { get; set; }
        public Int64 RowNum { get; set; }
        public string EIN { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string PreferredFirstName { get; set; }
        public string PreferredLastName { get; set; }
        public string DPName { get; set; }
        public string RCName { get; set; }
        public string TitleCode { get; set; }
        public string TitleLevel { get; set; }
        public string PayTitle { get; set; }
        public string RCCode { get; set; }
        public string PreviousDPName { get; set; }
        public string DPCode { get; set; }
        public string LocationCode { get; set; }
        public string ActionCode { get; set; }
        public string LeaveDateObserved { get; set; }
        public string LvStatusDesc { get; set; }
        public string ExpectedReturnDt { get; set; }
        public Boolean ShowPreferredColumns { get; set; }
    }

    public class StaffLeaveReport
    {
        public int Total { get; set; }
        [System.ComponentModel.DataAnnotations.Key]
        public Int64 RowNum { get; set; }
        public string EIN { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string PreferredFirstName { get; set; }
        public string PreferredLastName { get; set; }
        public string DPName { get; set; }
        public string RCName { get; set; }
        public string TitleCode { get; set; }
        public string TitleLevel { get; set; }
        public string PayTitle { get; set; }
        public string RCCode { get; set; }
        public string PreviousDPName { get; set; }
        public string DPCode { get; set; }
        public string LocationCode { get; set; }
        public string ActionCode { get; set; }
        public string LeaveDateObserved { get; set; }
        public string LvStatusDesc { get; set; }
        public string ExpectedReturnDt { get; set; }
        public Boolean ShowPreferredColumns { get; set; }
    }
}
