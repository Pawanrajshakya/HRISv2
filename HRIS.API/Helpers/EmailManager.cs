using System;
using System.Net;

namespace HRIS.API
{
    public static class EmailManager
    {
        public static void SendEmail(string smtpServer, 
            string from, string sendTo, string subject,
            string body, bool isBodyHtml = true,
            string bcc = null, string cc = null)
        {
            try
            {
                string[] toList = sendTo.Split(';');

                if (toList.Length == 0)
                    return;

                if (smtpServer.Length > 0)
                {

                    var htmlMessage = new System.Net.Mail.MailMessage
                    {
                        From = new System.Net.Mail.MailAddress(from),
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

                    var mySmtpClient = new System.Net.Mail.SmtpClient(smtpServer)
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
