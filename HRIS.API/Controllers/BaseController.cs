using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Text;

namespace HRIS.API.Controllers
{
    [ApiController]
    [HRISAuthorizeFilter]
    [ServiceFilter(typeof(UserActionFilter))]
    public class BaseController : ControllerBase
    {
        protected readonly IRCRepository _rcRepository;
        protected readonly IDPRepository _dpRepository;

        public BaseController(IRCRepository rcRepository, IDPRepository dpRepository)
        {
            _rcRepository = rcRepository;
            _dpRepository = dpRepository;
        }

        protected string GetDP(bool IsAgencyWise)
        {
            if (!IsAgencyWise)
            {
                return Utility.ConvertToString(
                    _dpRepository.GetAsync().Result
                    .Select(s => s.DPCode)
                    .ToList()
                    );
            }

            return string.Empty;
        }

        protected string GetRC(bool IsAgencyWise)
        {
            if (!IsAgencyWise)
            {
                var rcs = _rcRepository.GetAsync(UserSession.Instance.User.UserID).Result
                    .Select(s => s.Code)
                    .ToList();

                return Utility.ConvertToString(rcs);
            }

            return string.Empty;
        }

        protected string GetUrl(OvertimeParameters parameters)
        {
            StringBuilder stringBuilder = new StringBuilder();

            parameters.File.RDLFileName = string.IsNullOrEmpty(parameters.File.RDLFileName)
                ? parameters.ReportName
                : parameters.File.RDLFileName;

            switch (parameters.ReportName)
            {
                case "SearchStaffReport":
                case "UsersReport":
                case "LeaveReport":
                case "CeasedReport":
                case "EmergencyContactInfoReport":
                case "OvertimeReport":
                case "OvertimeEarnedAnalysisReport":
                case "PARReport":
                case "HeadCountReport":
                case "HeadCountTitleSummaryReport":
                case "HeadcountTitleAndBudgetSummaryReportByRCAndTitle":
                case "PMSEmployeeDetailReport":
                case "HeadcountTitleAndBudgetSummaryReconciliationReportByRCAndTitle":
                case "EEOSummaryReport":
                case "EEOConfirmedReportByRA":
                case "EEOPendingReportByRA":
                case "ECardsSentByRCReport":
                case "ECardsReceivedByRCReport":
                case "ECardsSentByRelationshipOfSenderReport":
                case "ECardsReceivedByRelationshipOfSenderReport":
                case "ECardsSentByExcellenceProgramReport":
                case "ECardsReceivedByExcellenceProgramReport":

                    stringBuilder.Append("&UserID=" + (string.IsNullOrEmpty(parameters.UserID) ? UserSession.Instance.User.UserID : parameters.UserID));
                    stringBuilder.Append("&SortColumn=" + (parameters.Pagination.SortColumn ?? ""));
                    stringBuilder.Append("&SortOrder=" + (parameters.Pagination.SortOrder ?? "asc"));
                    stringBuilder.Append("&SearchTerm=" + (parameters.Pagination.SearchTerm ?? ""));
                    break;
            }

            switch (parameters.ReportName)
            {
                case "SearchStaffReport":
                    stringBuilder.Append("&RCs=" + (parameters.RcDp.RCs ?? ""));
                    stringBuilder.Append("&DPs=" + (parameters.RcDp.DPs ?? ""));
                    stringBuilder.Append("&Locations=" + (parameters.Code.Locations ?? ""));
                    stringBuilder.Append("&PayTitles=" + (parameters.Code.Titles ?? ""));
                    stringBuilder.Append("&BackupTitles=" + (parameters.Code.BackupTitles ?? ""));
                    stringBuilder.Append("&CSStatus=" + (parameters.Code.CSStatuses ?? ""));
                    break;
                case "LeaveReport":
                    parameters.File.RDLFileName = "LeaveReportReport";
                    stringBuilder.Append("&RCs=" + (parameters.RcDp.RCs ?? ""));
                    stringBuilder.Append("&DPs=" + (parameters.RcDp.DPs ?? ""));
                    stringBuilder.Append("&PayTitles=" + (parameters.Code.Titles ?? ""));
                    stringBuilder.Append("&LvStatus=" + (parameters.Code.LvStatuses ?? ""));
                    stringBuilder.Append("&Option=Leave");
                    break;
                case "EmergencyContactInfoReport":
                    stringBuilder.Append("&RCs=" + (parameters.RcDp.RCs ?? ""));
                    stringBuilder.Append("&DPs=" + (parameters.RcDp.DPs ?? ""));
                    stringBuilder.Append("&Locations=" + (parameters.Code.Locations ?? ""));
                    break;
                case "CeasedReport":
                    parameters.File.RDLFileName = "LeaveReport";
                    stringBuilder.Append("&RCs=" + (parameters.RcDp.RCs ?? ""));
                    stringBuilder.Append("&DPs=" + (parameters.RcDp.DPs ?? ""));
                    stringBuilder.Append("&PayTitles=" + (parameters.Code.Titles ?? ""));
                    stringBuilder.Append("&LvStatus=" + (parameters.Code.LvStatuses ?? ""));
                    stringBuilder.Append("&Option=Ceased");
                    break;
                case "StaffDetails":
                    stringBuilder.Append("&UserID=" + (string.IsNullOrEmpty(parameters.UserID) ? UserSession.Instance.User.UserID : parameters.UserID));
                    stringBuilder.Append("&EIN=" + (parameters.Ein ?? ""));
                    stringBuilder.Append("&LanID=" + UserSession.Instance.User.LanID);
                    break;
                case "PARReport":
                    stringBuilder.Append("&DisplayColumns=" + "[Request Type][Transaction Type][Attrition EIN][Attrition Date][Attrition Reason][Requested RC Code][Requested DP Code][Requested Location][SA Action][SA Remark][SA Analyst][SA Date][HCU Action][HCU Remark][HCU Analyst][HCU Date][OSR Action][OSR Remark][OSR Analyst][OSR Date]");
                    stringBuilder.Append("&UserID=" + (string.IsNullOrEmpty(parameters.UserID) ? UserSession.Instance.User.UserID : parameters.UserID));
                    stringBuilder.Append("&DateFrom=" + (parameters.DateFrom ?? ""));
                    stringBuilder.Append("&DateTo=" + (parameters.DateTo ?? ""));
                    stringBuilder.Append("&RCs=" + (parameters.RcDp.RCs ?? ""));
                    stringBuilder.Append("&DPs=" + (parameters.RcDp.DPs ?? ""));
                    stringBuilder.Append("&Titles=" + (parameters.Code.Titles ?? ""));
                    stringBuilder.Append("&Locations=" + (parameters.Code.Locations ?? ""));
                    stringBuilder.Append("&OpenClose=" + (parameters.OpenClose ?? ""));
                    break;
                case "OvertimeReport":
                    stringBuilder.Append("&RCs=" + (parameters.RcDp.RCs ?? ""));
                    stringBuilder.Append("&DPs=" + (parameters.RcDp.DPs ?? ""));
                    stringBuilder.Append("&IsCalendar=" + (parameters.IsCalendarYear ? "Calendar" : "Fiscal"));
                    stringBuilder.Append("&RoleID=" + UserSession.Instance.User.RoleID);
                    break;
                case "CitytimeOTReportByMonth":
                    stringBuilder.Append("&UserID=" + (string.IsNullOrEmpty(parameters.UserID) ? UserSession.Instance.User.UserID : parameters.UserID));
                    stringBuilder.Append("&RCs=" + (string.IsNullOrEmpty(parameters.RcDp.RCs) ? "ALL" : parameters.RcDp.RCs));
                    stringBuilder.Append("&DPs=" + (string.IsNullOrEmpty(parameters.RcDp.DPs) ? "ALL" : parameters.RcDp.DPs));
                    stringBuilder.Append("&MinDate=" + (parameters.MinDate.ToString() ?? ""));
                    stringBuilder.Append("&MaxDate=" + (parameters.MaxDate.ToString() ?? ""));
                    stringBuilder.Append("&TotalOnly=true");
                    break;
                case "OvertimeEarnedAnalysisReport":
                    stringBuilder.Append("&RARC=" + (string.IsNullOrEmpty(parameters.RcDp.RCs) ? GetRC(false) : parameters.RcDp.RCs));
                    stringBuilder.Append("&CuDate=" + parameters.Year.ToString());
                    stringBuilder.Append("&vPYear=" + parameters.Year.ToString());
                    stringBuilder.Append("&vCYear=" + parameters.Year.ToString());
                    stringBuilder.Append("&isDateEarned=" + (parameters.IsDateEarned ? "*" : "0"));
                    break;
                case "HeadCountReport":
                    stringBuilder.Append("&RCs=" + (string.IsNullOrEmpty(parameters.RcDp.RCs) ? GetRC(false) : parameters.RcDp.RCs));
                    stringBuilder.Append("&DPs=" + (parameters.RcDp.DPs ?? ""));
                    break;
                case "HeadCountTitleSummaryReport":
                    stringBuilder.Append("&RCs=" + parameters.RcDp.RCs);
                    stringBuilder.Append("&Titles=" + (parameters.Code.Titles ?? ""));
                    break;
                case "HeadcountTitleAndBudgetSummaryReportByRCAndTitle":
                    stringBuilder.Append("&RCs=" + (string.IsNullOrEmpty(parameters.RcDp.RCs) ? GetRC(false) : parameters.RcDp.RCs));
                    stringBuilder.Append("&Titles=" + (parameters.Code.Titles ?? ""));
                    break;
                case "PMSEmployeeDetailReport":
                    stringBuilder.Append("&RCs=" + (string.IsNullOrEmpty(parameters.RcDp.RCs) ? GetRC(false) : parameters.RcDp.RCs));
                    stringBuilder.Append("&DPs=" + (parameters.RcDp.DPs ?? ""));
                    stringBuilder.Append("&LeaveStatus=" + (parameters.Code.LvStatuses ?? ""));
                    stringBuilder.Append("&Titles=" + (parameters.Code.Titles ?? ""));

                    break;
                case "HeadcountTitleAndBudgetSummaryReconciliationReportByRCAndTitle":
                    stringBuilder.Append("&RCs=" + parameters.RcDp.RCs);
                    stringBuilder.Append("&Titles=" + (parameters.Code.Titles ?? ""));
                    break;

                case "EEOConfirmedReportByRA":
                case "EEOPendingReportByRA":
                    stringBuilder.Append("&RA=" + parameters.RcDp.RCs);
                    break;

                case "EEOSummaryReport":
                    stringBuilder.Append("&RCs=" + parameters.RcDp.RCs);
                    break;
                case "ECardsSentByRCReport":
                case "ECardsReceivedByRCReport":
                case "ECardsSentByRelationshipOfSenderReport":
                case "ECardsReceivedByRelationshipOfSenderReport":
                case "ECardsSentByExcellenceProgramReport":
                case "ECardsReceivedByExcellenceProgramReport":
                    DateTime.TryParse(parameters.DateFrom, out DateTime from);
                    DateTime.TryParse(parameters.DateTo, out DateTime to);

                    stringBuilder.Append("&FromDate=" + (from.ToShortDateString() ?? ""));
                    stringBuilder.Append("&ToDate=" + (to.ToShortDateString() ?? ""));
                    stringBuilder.Append("&RC=" + (string.IsNullOrEmpty(parameters.RcDp.RCs) ? GetRC(false) : parameters.RcDp.RCs));
                    stringBuilder.Append("&SentBy=" + (parameters.IsSentBy));
                    break;
                case "MyStaffsContactInfoReport":
                case "MyStaffsContactInfoReportNonAdmin":
                    stringBuilder.Append("&UserID=" + (string.IsNullOrEmpty(parameters.UserID) ? UserSession.Instance.User.UserID : parameters.UserID));
                    break;

                case "ContactInformationReport":
                    stringBuilder.Append("&UserID=" + (string.IsNullOrEmpty(parameters.UserID) ? UserSession.Instance.User.UserID : parameters.UserID));
                    stringBuilder.Append("&EIN=" + (parameters.Ein ?? ""));
                    stringBuilder.Append("&IsCalendar=Calendar");
                    stringBuilder.Append("&ShowHome=" + ( (UserSession.Instance.User.RoleID == 6 && (UserSession.Instance.User.EIN != parameters.Ein)) ? "0" : "1"));
                    break;

            }

            stringBuilder.Append("&rs:Format=" + (parameters.File.Format ?? ""));

            return string.Format("{0}?{1}{2}{3}", ShareManager.Url, ShareManager.Path, parameters.File.RDLFileName, stringBuilder.ToString());

        }
    }
}