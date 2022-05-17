using Microsoft.Extensions.Configuration;

namespace HRIS.API
{
    public static class ShareManager
    {
        public static string UploadFolderPath { get; private set; }
        public static string SmtpServer { get; private set; }
        public static string SendTo { get; private set; }
        public static string From { get; private set; }
        public static string Url { get; private set; }
        public static string Path { get; private set; }
        public static string UserName { get; private set; }
        public static string Password { get; private set; }

        public static void Prepare(IConfiguration _config)
        {
            UploadFolderPath = _config["UploadFolderPath"];
            SmtpServer = _config["SMTPServer"];
            From = _config["LogEmail:Sender"];
            SendTo = _config["LogEmail:Receiver"];
            Url = _config["Report:Url"].ToString().Replace('@', '/');
            Path = _config["Report:Path"];
            UserName = _config["Report:UserName"];
            Password = _config["Report:Password"];
        }
    }
}
