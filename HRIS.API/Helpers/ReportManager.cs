using System.IO;
using System.Net;
using System.Text;

namespace HRIS.API
{
    public static class ReportManager
    {
        public static Stream Get(ReportParameters parameters)
        {
            string _url = GetUrl(parameters);

            try
            {

                WebRequest request = WebRequest.Create(_url);

                NetworkCredential credentials = new NetworkCredential(ShareManager.UserName, ShareManager.Password);
                request.Credentials = credentials;

                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream stream = response.GetResponseStream();
                return stream;
            }
            catch (System.Exception ex)
            {
                throw new System.Exception("Url: " + _url + " " + ex.Message);
            }
            
        }

        private static string GetUrl(ReportParameters parameters)
        {
            //add validation here

            StringBuilder _parameters = Prepare(parameters);

            return string.Format("{0}?{1}{2}{3}", ShareManager.Url, ShareManager.Path, parameters.File.RDLFileName, _parameters.ToString());
        }

        private static StringBuilder Prepare(ReportParameters parameters)
        {
            StringBuilder _parameters = new StringBuilder();

            switch (parameters.ReportName)
            {
                case "ActiveStaffReport":
                case "UsersReport":
                case "LeaveReport":
                case "CeasedReport":
                case "EmergencyContactInfoReport":
                    _parameters.Append("&UserID=" + (parameters.UserID ?? UserSession.Instance.User.UserID));
                    _parameters.Append("&SortColumn=" + (parameters.Pagination.SortColumn ?? ""));
                    _parameters.Append("&SortOrder=" + (parameters.Pagination.SortOrder ?? "asc"));
                    _parameters.Append("&SearchTerm=" + (parameters.Pagination.SearchTerm ?? ""));
                    break;
            }

            switch (parameters.ReportName)
            {
                case "ActiveStaffReport":
                    parameters.File.RDLFileName = "SearchStaffReport";
                    _parameters.Append("&RCs=" + (parameters.RcDp.RCs ?? ""));
                    _parameters.Append("&DPs=" + (parameters.RcDp.DPs ?? ""));
                    _parameters.Append("&Locations=" + (parameters.Code.Locations ?? ""));
                    _parameters.Append("&PayTitles=" + (parameters.Code.Titles ?? ""));
                    _parameters.Append("&BackupTitles=" + (parameters.Code.BackupTitles ?? ""));
                    _parameters.Append("&CSStatus=" + (parameters.Code.CSStatuses ?? ""));
                    break;
                case "LeaveReport":
                    parameters.File.RDLFileName = "LeaveReportReport";
                    _parameters.Append("&RCs=" + (parameters.RcDp.RCs ?? ""));
                    _parameters.Append("&DPs=" + (parameters.RcDp.DPs ?? ""));
                    _parameters.Append("&PayTitles=" + (parameters.Code.Titles ?? ""));
                    _parameters.Append("&LvStatus=" + (parameters.Code.LvStatuses ?? ""));
                    _parameters.Append("&Option=Leave");
                    break;
                case "EmergencyContactInfoReport":
                    parameters.File.RDLFileName = "EmergencyContactInfoReport";
                    _parameters.Append("&RCs=" + (parameters.RcDp.RCs ?? ""));
                    _parameters.Append("&DPs=" + (parameters.RcDp.DPs ?? ""));
                    _parameters.Append("&Locations=" + (parameters.Code.Locations ?? ""));
                    break;
                case "CeasedReport":
                    parameters.File.RDLFileName = "LeaveReport";
                    _parameters.Append("&RCs=" + (parameters.RcDp.RCs ?? ""));
                    _parameters.Append("&DPs=" + (parameters.RcDp.DPs ?? ""));
                    _parameters.Append("&PayTitles=" + (parameters.Code.Titles ?? ""));
                    _parameters.Append("&LvStatus=" + (parameters.Code.LvStatuses ?? ""));
                    _parameters.Append("&Option=Ceased");
                    break;
                case "StaffDetails":
                    parameters.File.RDLFileName = "StaffDetails";
                    _parameters.Append("&UserID=" + (parameters.UserID ?? UserSession.Instance.User.UserID));
                    _parameters.Append("&EIN=" + (parameters.Ein ?? ""));
                    _parameters.Append("&LanID=" + UserSession.Instance.User.LanID);
                    break;
            }

            _parameters.Append("&rs:Format=" + (parameters.File.Format ?? ""));
            return _parameters;
        }
    }
}
