using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace HRIS.API
{
    public static class ReportHelper
    {
        public static ReportResult Get(string reportName, string format, params object[] parameters)
        {
            try
            {
                string reportServerUrl = @"http://d2e1cldb16/reportserver";
                string reportPath = "/HRIS/Development/";
                Warning[] warnings;
                string mimeType = string.Empty;
                string encoding = string.Empty;
                string extension = string.Empty;
                string[] streams;
                ServerReport report = new ServerReport();
                report.ReportServerUrl = new Uri(reportServerUrl);

                report.ReportServerCredentials = new MyReportServerCredentials();
                report.ReportPath = reportPath + reportName;
                ReportParameter[] list = new ReportParameter[parameters.Length / 2];
                for (int i = 0; i < parameters.Length / 2; i++)
                {
                    list[i] = new ReportParameter((string)parameters[i * 2], ConvertToString(parameters[i * 2 + 1]));
                }
                report.SetParameters(list);
                byte[] mybytes = report.Render(format, null,
                                out mimeType, out encoding,
                                out extension, out streams, out warnings);

                return new ReportResult()
                {
                    Content = mybytes,
                    Extension = extension,
                    FileName = reportName + "." + extension
                };
            }
            catch (Exception e)
            {
                if (e.InnerException is Exception)
                    throw e.InnerException;
                throw e;
            }
        }
        public static string ConvertToString(object o)
        {
            if (o == null)
            {
                if (o is DateTime)
                    return null;
                return string.Empty;
            }
            else if (o.GetType() == typeof(List<string>))
            {
                return string.Join(",", (List<string>)o);
            }
            else
                return o.ToString();
        }
        //public static ReportResult Get(string reportName, string format, DataTable dt)
        //{
        //    try
        //    {
        //        Warning[] warnings;
        //        string mimeType = string.Empty;
        //        string encoding = string.Empty;
        //        string extension = string.Empty;
        //        string[] streams;
        //        ServerReport report = new ServerReport();
        //        report.ReportServerUrl = new Uri(@"http://d1e1cldbb/reportserver");
        //        report.ReportPath = @"/HRIS/" + reportName;
        //        byte[] mybytes = report.Render(format, null,
        //                        out mimeType, out encoding,
        //                        out extension, out streams, out warnings);

        //        return new ReportResult()
        //        {
        //            Content = mybytes,
        //            Extension = extension,
        //            FileName = reportName + "." + extension
        //        };
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        public static bool IsValidFormat(string format)
        {
            string f = format.ToLower();
            return f == "excel" || f == "pdf";
        }
    }

    public class ReportResult
    {
        public byte[] Content { get; set; }
        public string Extension { get; set; }
        public string FileName
        {
            get;
            set;
        }
    }
    [Serializable]
    public sealed class MyReportServerCredentials :
        IReportServerCredentials
    {
        public System.Security.Principal.WindowsIdentity ImpersonationUser
        {
            get
            {
                // Use the default Windows user.  Credentials will be
                // provided by the NetworkCredentials property.
                return null;
            }
        }

        public ICredentials NetworkCredentials
        {
            get
            {
                return new NetworkCredential("osrdata", "Purple12", "windows");
            }
        }

        public bool GetFormsCredentials(out Cookie authCookie,
                    out string userName, out string password,
                    out string authority)
        {
            authCookie = null;
            userName = null;
            password = null;
            authority = null;

            // Not using form credentials
            return false;
        }
    }
}
