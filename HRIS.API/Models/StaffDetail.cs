using System.Collections.Generic;

namespace HRIS.API
{
    public class StaffDetail
    {
        [System.ComponentModel.DataAnnotations.Key]
        public string EIN { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string LegalName { get; set; }
        public string PersonalEmail { get; set; }
        public string LeaveStatus { get; set; }
        public string ActionCode { get; set; }
        public string ActionReason { get; set; }
        public string ActionDate { get; set; }
        public string DPCode { get; set; }
        public string DPName { get; set; }
        public string PayTitleCode { get; set; }
        public string PayTitle { get; set; }
        public string PayTitleLevel { get; set; }
        public string TitleDate { get; set; }
        public string CSStatusCode { get; set; }
        public string CSStatus { get; set; }
        public string PayClass { get; set; }
        public string BackupTitleCode { get; set; }
        public string BackupTitle { get; set; }
        public string BackupTitleLevel { get; set; }
        public string BuTitleSuffix { get; set; }
        public string BuTitleDate { get; set; }
        public string BuMgrLvl { get; set; }
        public string BuLVStatus { get; set; }
        public string BuLeaveStatus { get; set; }
        public string BuLVReason { get; set; }
        public string BuDisbcd { get; set; }
        public string BuDisbName { get; set; }
        public string BuDP { get; set; }
        //public string BuDPName { get; set; }
        public string BudgetCode { get; set; }
        public string CityDate { get; set; }
        public string AgencyDate { get; set; }
        public int ListNum { get; set; }
        public int PositionNum { get; set; }
        public string RCCode { get; set; }
        public string RCName { get; set; }
        public string DisbCode { get; set; }
        public string DisbName { get; set; }
        public string MUCode { get; set; }
        public string MUName { get; set; }
        public string VetStatus { get; set; }
        public string Penind { get; set; }
        public string PenTier { get; set; }
        public string Schdtype { get; set; }
        public string CollectiveBargain { get; set; }
        //public string CollectiveBargainDesc { get; set; }
        public string Physhand { get; set; }
        public string Probind { get; set; }
        public string UnconvLeaveStatus { get; set; }
        public string LeaveDate { get; set; }
        public string LocationCode { get; set; }
        public string WorkAddress { get; set; }
        public string WorkCity { get; set; }
        public string WorkZipCode { get; set; }
        public string WorkPhone { get; set; }
        public string WorkEmail { get; set; }
        public string HomeAddress { get; set; }
        public string HomeCity { get; set; }
        public string HomeState { get; set; }
        public string ZipCode { get; set; }
        public string HomePhone { get; set; }
        public string Supervisor { get; set; }
        public bool ShowPreferredColumns { get; set; }
    }

    public class StaffDetailDto
    {
        public string EIN { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string LegalName { get; set; }
        public string PersonalEmail { get; set; }
        public string LeaveStatus { get; set; }
        public string ActionCode { get; set; }
        public string ActionReason { get; set; }
        public string ActionDate { get; set; }
        public string DPCode { get; set; }
        public string DPName { get; set; }
        public string PayTitleCode { get; set; }
        public string PayTitle { get; set; }
        public string PayTitleLevel { get; set; }
        public string TitleDate { get; set; }
        public string CSStatusCode { get; set; }
        public string CSStatus { get; set; }
        public string PayClass { get; set; }
        public string BackupTitleCode { get; set; }
        public string BackupTitle { get; set; }
        public string BackupTitleLevel { get; set; }
        public string BuTitleSuffix { get; set; }
        public string BuTitleDate { get; set; }
        public string BuMgrLvl { get; set; }
        public string BuLVStatus { get; set; }
        public string BuLeaveStatus { get; set; }
        public string BuLVReason { get; set; }
        public string BuDisbcd { get; set; }
        public string BuDisbName { get; set; }
        public string BuDP { get; set; }
        //public string BuDPName { get; set; }
        public string BudgetCode { get; set; }
        public string CityDate { get; set; }
        public string AgencyDate { get; set; }
        public int ListNum { get; set; }
        public int PositionNum { get; set; }
        public string RCCode { get; set; }
        public string RCName { get; set; }
        public string DisbCode { get; set; }
        public string DisbName { get; set; }
        public string MUCode { get; set; }
        public string MUName { get; set; }
        public string VetStatus { get; set; }
        public string Penind { get; set; }
        public string PenTier { get; set; }
        public string Schdtype { get; set; }
        public string CollectiveBargain { get; set; }
        //public string CollectiveBargainDesc { get; set; }
        public string Physhand { get; set; }
        public string Probind { get; set; }
        public string UnconvLeaveStatus { get; set; }
        public string LeaveDate { get; set; }
        public string LocationCode { get; set; }
        public string WorkAddress { get; set; }
        public string WorkCity { get; set; }
        public string WorkZipCode { get; set; }
        public string WorkPhone { get; set; }
        public string WorkEmail { get; set; }
        public string HomeAddress { get; set; }
        public string HomeCity { get; set; }
        public string HomeState { get; set; }
        public string ZipCode { get; set; }
        public string HomePhone { get; set; }
        public string Supervisor { get; set; }
        public bool ShowPreferredColumns { get; set; }
        //public string CityTimeID { get; set; }
        //public string CityTimeSchedule { get; set; }
        //public string BuRC { get; set; }
        //public string BuRCName { get; set; }
        //public string BuRCNameShort { get; set; }
        //public string RCNameShort { get; set; }
        //public string BuCsStatus { get; set; }
        //public string BuCsStatusDesc { get; set; }

        //public List<ContactInfoDto> ContactInfo { get; set; }
        //public DataTable EDUDetails { get; set; }

        //public DataTable OvertimeCalendar { get; set; }

        //public DataTable OvertimeFiscal { get; set; }
    }
}
