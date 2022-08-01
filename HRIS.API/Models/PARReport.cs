using System;

namespace HRIS.API
{
    public class PARReportDto
    {
        public int Total { get; set; }
        public Int64 RowNum { get; set; }
        public string ReqNumber { get; set; }
        public string ReqType { get; set; }
        public string RC_code { get; set; }
        public string RC_po_approve_date { get; set; }
        public string Trans_code { get; set; }
        public string Trans_Desc { get; set; }
        public string TxtDisReplace { get; set; }
        public string AttritionEin { get; set; }
        public string TxtAttdate { get; set; }
        public string Attr_Replace_Reason_desc { get; set; }
        public string TitleCode { get; set; }
        public string Title { get; set; }
        public string TxtFunCTitle { get; set; }
        public string TxtDPCode { get; set; }
        public string TxtLoc { get; set; }
        public string SA_analyst_approve { get; set; }
        public string SA_analyst_approve_desc { get; set; }
        public string SA_analyst_remark { get; set; }
        public string SA_analyst_appr_by { get; set; }
        public string SA_analyst_approve_date { get; set; }
        public string OBA_analyst_approve { get; set; }
        public string OBA_analyst_approve_desc { get; set; }
        public string OBA_analyst_remark { get; set; }
        public string OBA_analyst_appr_by { get; set; }
        public string OBA_analyst_approve_date { get; set; }
        public string PERC_approve { get; set; }
        public string PERC_approve_desc { get; set; }
        public string PERC_Remark { get; set; }
        public string PERC_appr_by { get; set; }
        public string PERC_approve_date { get; set; }
        public string COMMISS_approve { get; set; }
        public string COMMISS_approve_desc { get; set; }
        public string COMMISS_Remark { get; set; }
        public string COMMISS_appr_by { get; set; }
        public string COMMISS_approve_date { get; set; }
        public string NYCAPS { get; set; }
        public string OMB_Disposition { get; set; }
        public string OMB_Disposition_desc { get; set; }
        public string OMBSubmittedDate { get; set; }
        public string OMBapproval { get; set; }
        public string DaysatOMB { get; set; }
        public int ShelfOMBDays { get; set; }
        public string OMB_ShelfDate { get; set; }
        public string CPSStatus { get; set; }
        public string ScheduleDate { get; set; }
        public string Action { get; set; }
        public string Comment { get; set; }
        public string EffDate { get; set; }
        public string ScreeningDate { get; set; }
        public string ReviewDate { get; set; }
        public string PoolDate { get; set; }
        public string CandidateFirstName { get; set; }
        public string CandidateMIName { get; set; }
        public string CandidateLastName { get; set; }
        public string CandidateEmplNo { get; set; }
        public string PreferredFirstName { get; set; }
        public string PreferredLastName { get; set; }
        public string CPD_released_to_Candidate { get; set; }
        public string CPD_Submitted_to_Processing { get; set; }
        public string DateFlyerPosted { get; set; }
        public string DateFlyerRemoved { get; set; }
        public string AsOfDate { get; set; }
        public string CurrentStatus { get; set; }
        public string RecruitmentStatus { get; set; }
        public int Nos { get; set; }
    }

    public class PARReport
    {
        public int Total { get; set; }
        [System.ComponentModel.DataAnnotations.Key]
        public Int64 RowNum { get; set; }
        public string ReqNumber { get; set; }
        public string ReqType { get; set; }
        public string RC_code { get; set; }
        public string RC_po_approve_date { get; set; }
        public string Trans_code { get; set; }
        public string Trans_DESC { get; set; }
        public string TxtDisReplace { get; set; }
        public string AttritionEIN { get; set; }
        public string TxtAttdate { get; set; }
        public string Attr_Replace_Reason_desc { get; set; }
        public string TitleCode { get; set; }
        public string Title { get; set; }
        public string TxtFunCTitle { get; set; }
        public string TxtDPCode { get; set; }
        public string TxtLoc { get; set; }
        public string SA_analyst_approve { get; set; }
        public string SA_analyst_approve_desc { get; set; }
        public string SA_analyst_remark { get; set; }
        public string SA_analyst_appr_by { get; set; }
        public string SA_analyst_approve_date { get; set; }
        public string OBA_analyst_approve { get; set; }
        public string OBA_analyst_approve_desc { get; set; }
        public string OBA_analyst_remark { get; set; }
        public string OBA_analyst_appr_by { get; set; }
        public string OBA_analyst_approve_date { get; set; }
        public string PERC_approve { get; set; }
        public string PERC_approve_desc { get; set; }
        public string PERC_Remark { get; set; }
        public string PERC_appr_by { get; set; }
        public string PERC_approve_date { get; set; }
        public string COMMISS_approve { get; set; }
        public string COMMISS_approve_desc { get; set; }
        public string COMMISS_Remark { get; set; }
        public string COMMISS_appr_by { get; set; }
        public string COMMISS_approve_date { get; set; }
        public string NYCAPS { get; set; }
        public string OMB_Disposition { get; set; }
        public string OMB_Disposition_desc { get; set; }
        public string OMBSubmittedDate { get; set; }
        public string OMBapproval { get; set; }
        public string DaysatOMB { get; set; }
        public int ShelfOMBDays { get; set; }
        public string OMB_ShelfDate { get; set; }
        public string CPSStatus { get; set; }
        public string ScheduleDate { get; set; }
        public string Action { get; set; }
        public string Comment { get; set; }
        public string Effdate { get; set; }
        public string ScreeningDate { get; set; }
        public string ReviewDate { get; set; }
        public string PoolDate { get; set; }
        public string CandidateFirstName { get; set; }
        public string CandidateMIName { get; set; }
        public string CandidateLastName { get; set; }
        public string CandidateEmplNo { get; set; }
        public string PreferredFirstName { get; set; }
        public string PreferredLastName { get; set; }
        public string CPD_released_to_Candidate { get; set; }
        public string CPD_Submitted_to_Processing { get; set; }
        public string DateFlyerPosted { get; set; }
        public string DateFlyerRemoved { get; set; }
        public string AsOfDate { get; set; }
        public string CurrentStatus { get; set; }
        public string RecruitmentStatus { get; set; }
        public int Nos { get; set; }
    }

    public class PARDetail
    {
        [System.ComponentModel.DataAnnotations.Key]
        public Int64 Row { get; set; }
        public string NewRow { get; set; }
        public string REQNUMBER { get; set; }
        public string ReqType { get; set; }
        public string RC_Code { get; set; }
        public string RC_po_appr_by { get; set; }
        public string RC_po_approve_date { get; set; } //datetime
        public string Trans_code { get; set; }
        public string Trans_DESC { get; set; }
        public string TxtDisReplace { get; set; }
        public string AttritionEIN { get; set; }
        public string TxtAttdate { get; set; } //datetime
        public string Attr_Replace_Reason_desc { get; set; }
        public string TitleCode { get; set; }
        public string Title { get; set; }
        public string TxtFunCTitle { get; set; }
        public string TxtDPCode { get; set; }
        public string TxtLoc { get; set; }
        public string SA_analyst_approve { get; set; }
        public string SA_analyst_approve_desc { get; set; }
        public string SA_analyst_remark { get; set; }
        public string SA_analyst_appr_by { get; set; }
        public string SA_analyst_approve_date { get; set; } //datetime
        public string OBA_analyst_approve { get; set; }
        public string OBA_analyst_approve_desc { get; set; }
        public string OBA_analyst_remark { get; set; }
        public string OBA_analyst_appr_by { get; set; }
        public string OBA_analyst_approve_date { get; set; } //datetime
        public string PERC_approve { get; set; }
        public string PERC_approve_desc { get; set; }
        public string PERC_Remark { get; set; }
        public string PERC_appr_by { get; set; }
        public string PERC_approve_date { get; set; } //datetime
        public string COMMISS_approve { get; set; }
        public string COMMISS_approve_desc { get; set; }
        public string COMMISS_Remark { get; set; }
        public string COMMISS_appr_by { get; set; }
        public string COMMISS_approve_date { get; set; } //datetime
        public string NYCAPS { get; set; }
        public string OMB_Disposition { get; set; }
        public string OMB_Disposition_desc { get; set; }
        public string OMBapproval { get; set; } //datetime
        public string OMB_ShelfDate { get; set; } //datetime
        public string CPSStatus { get; set; }
        public string ScheduleDate { get; set; } //datetime
        public string Action { get; set; }
        public string ActionDesc { get; set; }
        public string Comment { get; set; }
        public string EffDate { get; set; } //datetime
        public string ScreeningDate { get; set; } //datetime
        public string ReviewDate { get; set; } //datetime
        public string PoolDate { get; set; } //datetime
        public string CandidateFirstName { get; set; }
        public string CandidateMIName { get; set; }
        public string CandidateLastName { get; set; }
        public string CandidateEmplNo { get; set; }
        public string CPD_released_to_Candidate { get; set; } //datetime
        public string CPD_Submitted_to_Processing { get; set; } //datetime
        public string DateFlyerPosted { get; set; } //datetime
        public string DateFlyerRemoved { get; set; } //datetime
        public string AsOfDate { get; set; } //datetime
        public string CurrentStatus { get; set; }
        public string RecruitmentStatus { get; set; }
    }

    public class PARDetailDto
    {
        public Int64 Row { get; set; }
        public string NewRow { get; set; }
        public string ReqNumber { get; set; }
        public string ReqType { get; set; }
        public string RC_Code { get; set; }
        public string RC_po_appr_by { get; set; }
        public string RC_po_approve_date { get; set; } //datetime
        public string Trans_code { get; set; }
        public string Trans_Desc { get; set; }
        public string TxtDisReplace { get; set; }
        public string AttritionEIN { get; set; }
        public string TxtAttdate { get; set; } //datetime
        public string Attr_Replace_Reason_desc { get; set; }
        public string TitleCode { get; set; }
        public string Title { get; set; }
        public string TxtFunCTitle { get; set; }
        public string TxtDPCode { get; set; }
        public string TxtLoc { get; set; }
        public string SA_analyst_approve { get; set; }
        public string SA_analyst_approve_desc { get; set; }
        public string SA_analyst_remark { get; set; }
        public string SA_analyst_appr_by { get; set; }
        public string SA_analyst_approve_date { get; set; } //datetime
        public string OBA_analyst_approve { get; set; }
        public string OBA_analyst_approve_desc { get; set; }
        public string OBA_analyst_remark { get; set; }
        public string OBA_analyst_appr_by { get; set; }
        public string OBA_analyst_approve_date { get; set; } //datetime
        public string PERC_approve { get; set; }
        public string PERC_approve_desc { get; set; }
        public string PERC_Remark { get; set; }
        public string PERC_appr_by { get; set; }
        public string PERC_approve_date { get; set; } //datetime
        public string COMMISS_approve { get; set; }
        public string COMMISS_approve_desc { get; set; }
        public string COMMISS_Remark { get; set; }
        public string COMMISS_appr_by { get; set; }
        public string COMMISS_approve_date { get; set; } //datetime
        public string NYCAPS { get; set; }
        public string OMB_Disposition { get; set; }
        public string OMB_Disposition_desc { get; set; }
        public string OMBapproval { get; set; } //datetime
        public string OMB_ShelfDate { get; set; } //datetime
        public string CPSStatus { get; set; }
        public string ScheduleDate { get; set; } //datetime
        public string Action { get; set; }
        public string ActionDesc { get; set; }
        public string Comment { get; set; }
        public string EffDate { get; set; } //datetime
        public string ScreeningDate { get; set; } //datetime
        public string ReviewDate { get; set; } //datetime
        public string PoolDate { get; set; } //datetime
        public string CandidateFirstName { get; set; }
        public string CandidateMIName { get; set; }
        public string CandidateLastName { get; set; }
        public string CandidateEmplNo { get; set; }
        public string CPD_released_to_Candidate { get; set; } //datetime
        public string CPD_Submitted_to_Processing { get; set; } //datetime
        public string DateFlyerPosted { get; set; } //datetime
        public string DateFlyerRemoved { get; set; } //datetime
        public string AsOfDate { get; set; } //datetime
        public string CurrentStatus { get; set; }
        public string RecruitmentStatus { get; set; }
    }
}
