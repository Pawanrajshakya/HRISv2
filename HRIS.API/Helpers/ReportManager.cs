using System.IO;
using System.Net;

namespace HRIS.API
{
    public static class ReportManager
    {
        public static Stream Get(string url)
        {
            try
            {

                if (string.IsNullOrEmpty(url))
                {
                    throw new System.ArgumentException($"'{nameof(url)}' cannot be null or empty.", nameof(url));
                }

                WebRequest request = WebRequest.Create(url);

                NetworkCredential credentials = new NetworkCredential(ShareManager.UserName, ShareManager.Password);
                request.Credentials = credentials;

                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream stream = response.GetResponseStream();

                return stream;
            }
            catch (System.Exception ex)
            {
                throw new System.Exception("Url: " + url + " " + ex.Message);
            }

        }
    }
}
