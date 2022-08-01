using System.IO;
using System.Net;
using System.Text;

namespace HRIS.API
{
    public static class ReportManager
    {
        public static ReportParameters ReportParameters { get; set; }
        public static string URL { get; set; }

        public static Stream Get()
        {

            try
            {
                URL = GetUrl();

                WebRequest request = WebRequest.Create(URL);

                NetworkCredential credentials = new NetworkCredential(ShareManager.UserName, ShareManager.Password);
                request.Credentials = credentials;

                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream stream = response.GetResponseStream();
                return stream;
            }
            catch (System.Exception ex)
            {
                throw new System.Exception("Url: " + URL + " " + ex.Message);
            }

        }

        private static string GetUrl()
        {
            StringBuilder stringBuilder = new StringBuilder();

            switch (ReportParameters.ReportName)
            {
                case "ActiveStaffReport":
                case "UsersReport":
                case "LeaveReport":
                case "CeasedReport":
                case "EmergencyContactInfoReport":
                case "PARReport":
                    stringBuilder.Append("&UserID=" + (ReportParameters.UserID ?? UserSession.Instance.User.UserID));
                    stringBuilder.Append("&SortColumn=" + (ReportParameters.Pagination.SortColumn ?? ""));
                    stringBuilder.Append("&SortOrder=" + (ReportParameters.Pagination.SortOrder ?? "asc"));
                    stringBuilder.Append("&SearchTerm=" + (ReportParameters.Pagination.SearchTerm ?? ""));
                    break;
            }

            switch (ReportParameters.ReportName)
            {
                case "ActiveStaffReport":
                    ReportParameters.File.RDLFileName = "SearchStaffReport";
                    stringBuilder.Append("&RCs=" + (ReportParameters.RcDp.RCs ?? ""));
                    stringBuilder.Append("&DPs=" + (ReportParameters.RcDp.DPs ?? ""));
                    stringBuilder.Append("&Locations=" + (ReportParameters.Code.Locations ?? ""));
                    stringBuilder.Append("&PayTitles=" + (ReportParameters.Code.Titles ?? ""));
                    stringBuilder.Append("&BackupTitles=" + (ReportParameters.Code.BackupTitles ?? ""));
                    stringBuilder.Append("&CSStatus=" + (ReportParameters.Code.CSStatuses ?? ""));
                    break;
                case "LeaveReport":
                    ReportParameters.File.RDLFileName = "LeaveReportReport";
                    stringBuilder.Append("&RCs=" + (ReportParameters.RcDp.RCs ?? ""));
                    stringBuilder.Append("&DPs=" + (ReportParameters.RcDp.DPs ?? ""));
                    stringBuilder.Append("&PayTitles=" + (ReportParameters.Code.Titles ?? ""));
                    stringBuilder.Append("&LvStatus=" + (ReportParameters.Code.LvStatuses ?? ""));
                    stringBuilder.Append("&Option=Leave");
                    break;
                case "EmergencyContactInfoReport":
                    ReportParameters.File.RDLFileName = "EmergencyContactInfoReport";
                    stringBuilder.Append("&RCs=" + (ReportParameters.RcDp.RCs ?? ""));
                    stringBuilder.Append("&DPs=" + (ReportParameters.RcDp.DPs ?? ""));
                    stringBuilder.Append("&Locations=" + (ReportParameters.Code.Locations ?? ""));
                    break;
                case "CeasedReport":
                    ReportParameters.File.RDLFileName = "LeaveReport";
                    stringBuilder.Append("&RCs=" + (ReportParameters.RcDp.RCs ?? ""));
                    stringBuilder.Append("&DPs=" + (ReportParameters.RcDp.DPs ?? ""));
                    stringBuilder.Append("&PayTitles=" + (ReportParameters.Code.Titles ?? ""));
                    stringBuilder.Append("&LvStatus=" + (ReportParameters.Code.LvStatuses ?? ""));
                    stringBuilder.Append("&Option=Ceased");
                    break;
                case "StaffDetails":
                    ReportParameters.File.RDLFileName = "StaffDetails";
                    stringBuilder.Append("&UserID=" + (ReportParameters.UserID ?? UserSession.Instance.User.UserID));
                    stringBuilder.Append("&EIN=" + (ReportParameters.Ein ?? ""));
                    stringBuilder.Append("&LanID=" + UserSession.Instance.User.LanID);
                    break;
                case "PARReport":
                    ReportParameters.File.RDLFileName = "PARReport";

                    stringBuilder.Append("&DisplayColumns=" + "[Request Type][Transaction Type][Attrition EIN][Attrition Date][Attrition Reason][Requested RC Code][Requested DP Code][Requested Location][SA Action][SA Remark][SA Analyst][SA Date][HCU Action][HCU Remark][HCU Analyst][HCU Date][OSR Action][OSR Remark][OSR Analyst][OSR Date]");
                    stringBuilder.Append("&UserID=" + (ReportParameters.UserID ?? UserSession.Instance.User.UserID));
                    stringBuilder.Append("&DateFrom=" + (ReportParameters.DateFrom ?? ""));
                    stringBuilder.Append("&DateTo=" + (ReportParameters.DateTo ?? ""));
                    stringBuilder.Append("&RCs=" + (ReportParameters.RcDp.RCs ?? ""));
                    stringBuilder.Append("&DPs=" + (ReportParameters.RcDp.DPs ?? ""));
                    stringBuilder.Append("&Titles=" + (ReportParameters.Code.Titles ?? ""));
                    stringBuilder.Append("&Locations=" + (ReportParameters.Code.Locations ?? ""));
                    stringBuilder.Append("&OpenClose=" + (ReportParameters.OpenClose ?? ""));
                    break;
            }

            stringBuilder.Append("&rs:Format=" + (ReportParameters.File.Format ?? ""));

            return string.Format("{0}?{1}{2}{3}", ShareManager.Url, ShareManager.Path, ReportParameters.File.RDLFileName, stringBuilder.ToString());

        }
    }
}
