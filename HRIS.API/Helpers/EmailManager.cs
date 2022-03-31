using System;
using System.Net;

namespace HRIS.API
{
    public static class EmailManager
    {
        public static void SendEmail(string subject, 
            string body, string smtpServer, string sendTo, string from, 
            bool isBodyHtml = true, string bcc = null, string cc = null)
        {
            try
            {
                if (smtpServer.Length > 0)
                {
                    var htmlMessage = new System.Net.Mail.MailMessage();
                    htmlMessage.From = new System.Net.Mail.MailAddress(from);

                    string[] toList = sendTo.Split(';');

                    foreach (var address in toList)
                    {
                        htmlMessage.To.Add(address);
                    }

                    if (!string.IsNullOrEmpty(bcc))
                    {
                        string[] bccList = bcc.Split(';');
                        foreach (var address in bccList)
                        {
                            htmlMessage.Bcc.Add(address);
                        }
                    }

                    if (!string.IsNullOrEmpty(cc))
                    {
                        string[] ccList = cc.Split(';');
                        foreach (var address in ccList)
                        {
                            htmlMessage.CC.Add(address);
                        }
                    }

                    htmlMessage.Subject = subject;

                    htmlMessage.Body = body;

                    htmlMessage.IsBodyHtml = isBodyHtml;

                    var mySmtpClient = new System.Net.Mail.SmtpClient(smtpServer);

                    mySmtpClient.Credentials = CredentialCache.DefaultNetworkCredentials;

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
