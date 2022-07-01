using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{

    public class ActiveStaff
    {
        public int Total { get; set; }
        [Key]
        public int RowNum { get; set; }
        public string EIN { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PreferredFirstName { get; set; }
        public string PreferredLastName { get; set; }
        public string CombinedFirstName { get; set; }
        public string CombinedLastName { get; set; }
        public string TitleCode { get; set; }
        public string TitleLevel { get; set; }
        public string PayTitle { get; set; }
        public string PayTitleDate { get; set; }
        public string CSStatus { get; set; }
        public string BackupTitleCode { get; set; }
        public string BackupTitle { get; set; }
        public string BackupTitleDate { get; set; }
        public string DPCode { get; set; }
        public string DPName { get; set; }
        public string Address { get; set; }
        public string RCCode { get; set; }
        public string RCName { get; set; }
        public string LocationCode { get; set; }
        public string ActionDate { get; set; }
        public string ActionCode { get; set; }
        public string ActionReason { get; set; }
        public string CityTimeSchedule { get; set; }
        public string CityTimeID { get; set; }
        public Boolean ShowPreferredColumns { get; set; }
    }
}
