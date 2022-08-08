using Microsoft.AspNetCore.Mvc;
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

            switch (parameters.ReportName)
            {
                case "ActiveStaffReport":
                case "UsersReport":
                case "LeaveReport":
                case "CeasedReport":
                case "EmergencyContactInfoReport":
                case "OvertimeReport":
                case "OvertimeEarnedAnalysisReport":
                case "PARReport":
                    stringBuilder.Append("&UserID=" + (string.IsNullOrEmpty(parameters.UserID) ? UserSession.Instance.User.UserID : parameters.UserID));
                    stringBuilder.Append("&SortColumn=" + (parameters.Pagination.SortColumn ?? ""));
                    stringBuilder.Append("&SortOrder=" + (parameters.Pagination.SortOrder ?? "asc"));
                    stringBuilder.Append("&SearchTerm=" + (parameters.Pagination.SearchTerm ?? ""));
                    break;
            }

            switch (parameters.ReportName)
            {
                case "ActiveStaffReport":
                    parameters.File.RDLFileName = "SearchStaffReport";
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
                    parameters.File.RDLFileName = "EmergencyContactInfoReport";
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
                    parameters.File.RDLFileName = "StaffDetails";
                    stringBuilder.Append("&UserID=" + (string.IsNullOrEmpty(parameters.UserID) ? UserSession.Instance.User.UserID : parameters.UserID));
                    stringBuilder.Append("&EIN=" + (parameters.Ein ?? ""));
                    stringBuilder.Append("&LanID=" + UserSession.Instance.User.LanID);
                    break;
                case "PARReport":
                    parameters.File.RDLFileName = "PARReport";

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
                    parameters.File.RDLFileName = "OvertimeReport";
                    stringBuilder.Append("&RCs=" + (parameters.RcDp.RCs ?? ""));
                    stringBuilder.Append("&DPs=" + (parameters.RcDp.DPs ?? ""));
                    stringBuilder.Append("&IsCalendar=" + (parameters.IsCalendarYear ? "Calendar" : "Fiscal"));
                    stringBuilder.Append("&RoleID=" + UserSession.Instance.User.RoleID);
                    break;
                case "CitytimeOTReportByMonth":
                    parameters.File.RDLFileName = "CitytimeOTReportByMonth";
                    stringBuilder.Append("&UserID=" + (string.IsNullOrEmpty(parameters.UserID) ? UserSession.Instance.User.UserID : parameters.UserID));
                    stringBuilder.Append("&RCs=" + (string.IsNullOrEmpty(parameters.RcDp.RCs) ? "ALL" : parameters.RcDp.RCs));
                    stringBuilder.Append("&DPs=" + (string.IsNullOrEmpty(parameters.RcDp.DPs) ? "ALL" : parameters.RcDp.DPs));
                    stringBuilder.Append("&MinDate=" + (parameters.MinDate.ToString() ?? ""));
                    stringBuilder.Append("&MaxDate=" + (parameters.MaxDate.ToString() ?? ""));
                    stringBuilder.Append("&TotalOnly=true");
                    break;
                case "OvertimeEarnedAnalysisReport":
                    parameters.File.RDLFileName = "OvertimeEarnedAnalysisReport";
                    stringBuilder.Append("&RARC=" + (string.IsNullOrEmpty(parameters.RcDp.RCs) ? GetRC(false) : parameters.RcDp.RCs));
                    stringBuilder.Append("&CuDate=" + parameters.Year.ToString());
                    stringBuilder.Append("&vPYear=" + parameters.Year.ToString());
                    stringBuilder.Append("&vCYear=" + parameters.Year.ToString());
                    stringBuilder.Append("&isDateEarned=" + (parameters.IsDateEarned ? "*" : "0"));
                    break;
            }

            stringBuilder.Append("&rs:Format=" + (parameters.File.Format ?? ""));

            return string.Format("{0}?{1}{2}{3}", ShareManager.Url, ShareManager.Path, parameters.File.RDLFileName, stringBuilder.ToString());

        }
    }
}