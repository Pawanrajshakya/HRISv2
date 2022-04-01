using System;
using System.Net;

namespace HRIS.API
{
    public static class EmailManager
    {
        public static string SmtpServer { get; set; }
        public static string SendTo { get; set; }
        public static string From { get; set; }

        public static void SendEmail(string subject,
            string body, bool isBodyHtml = true,
            string bcc = null, string cc = null)
        {
            try
            {
                string[] toList = SendTo.Split(';');

                if (toList.Length == 0)
                    return;

                if (SmtpServer.Length > 0)
                {

                    var htmlMessage = new System.Net.Mail.MailMessage
                    {
                        From = new System.Net.Mail.MailAddress(From),
                        Subject = subject,
                        Body = body,
                        IsBodyHtml = isBodyHtml
                    };

                    foreach (var address in toList)
                    {
                        htmlMessage.To.Add(address.Trim());
                    }

                    if (!string.IsNullOrEmpty(bcc))
                    {
                        string[] bccList = bcc.Split(';');
                        foreach (var address in bccList)
                        {
                            htmlMessage.Bcc.Add(address.Trim());
                        }
                    }

                    if (!string.IsNullOrEmpty(cc))
                    {
                        string[] ccList = cc.Split(';');
                        foreach (var address in ccList)
                        {
                            htmlMessage.CC.Add(address.Trim());
                        }
                    }

                    var mySmtpClient = new System.Net.Mail.SmtpClient(SmtpServer)
                    {
                        Credentials = CredentialCache.DefaultNetworkCredentials
                    };

                    mySmtpClient.Send(htmlMessage);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
