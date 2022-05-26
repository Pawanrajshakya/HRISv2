using System.IO;
using System.Net;
using System.Text;

namespace HRIS.API
{
    public static class ReportManager
    {
        public static Stream Get(ReportParameters parameters)
        {
            StringBuilder _parameters = new StringBuilder();


            if (parameters.Detail.ReportName == "SearchStaffReport" ||
                parameters.Detail.ReportName == "UsersReport")
            {
                _parameters.Append("&UserID=" + (parameters.Detail.UserID ?? UserSession.Instance.User.UserID));
                _parameters.Append("&SortColumn=" + (parameters.Pagination.SortColumn ?? ""));
                _parameters.Append("&SortOrder=" + (parameters.Pagination.SortOrder ?? "asc"));
                _parameters.Append("&SearchTerm=" + (parameters.Pagination.SearchTerm ?? ""));
            }

            if (parameters.Detail.ReportName == "SearchStaffReport")
            {
                _parameters.Append("&RCs=" + (parameters.RcDp.RC ?? ""));
                _parameters.Append("&DPs=" + (parameters.RcDp.DP ?? ""));
                _parameters.Append("&Locations=" + (parameters.Code.Locations ?? ""));
                _parameters.Append("&PayTitles=" + (parameters.Code.Titles ?? ""));
                _parameters.Append("&BackupTitles=" + (parameters.Code.BackupTitles ?? ""));
                _parameters.Append("&CSStatus=" + (parameters.Code.CSStatus ?? ""));
            }
            _parameters.Append("&rs:Format=" + (parameters.Detail.Format ?? ""));

            Stream stream = GetStream(parameters, _parameters);

            return stream;
        }

        private static Stream GetStream(ReportParameters parameters, StringBuilder _parameters)
        {
            string _url = string.Format("{0}?{1}{2}{3}", ShareManager.Url, ShareManager.Path, parameters.Detail.ReportName, _parameters.ToString());

            WebRequest request = WebRequest.Create(_url);

            NetworkCredential credentials = new NetworkCredential(ShareManager.UserName, ShareManager.Password);
            request.Credentials = credentials;

            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            Stream stream = response.GetResponseStream();
            return stream;
        }
    }
}
