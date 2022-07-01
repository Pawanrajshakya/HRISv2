using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface ILogRepository
    {
        public Task<bool> Save(
            string source, 
            DateTime logDateTime, 
            string message, 
            string queryString, 
            string targetSite, 
            string stackTrace, 
            string serverName, 
            string requestUrl, 
            string userAgent, 
            string userIP, 
            string userAuthentication, 
            string userName);

        public Task<bool> Access(
            string sessionID, 
            string userName,
            string hostName, 
            string osVersion, 
            string browser, 
            string browserVersion, 
            string url,
            string action);
    }

    public class LogRepository : Repository, ILogRepository
    {
        public LogRepository(HRISDataContext context, AutoMapper.IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> Access(string sessionID, string userName, string hostName, string osVersion, 
            string browser, string browserVersion, string url, string action)
        {
            SqlParameter[] sqlParameters = new SqlParameter[] {
                                new SqlParameter("@sessionID", sessionID){},
                                new SqlParameter("@userName", userName){},
                                new SqlParameter("@hostName", hostName){},
                                new SqlParameter("@osVersion", osVersion){},
                                new SqlParameter("@browser", browser){},
                                new SqlParameter("@browserVersion", browserVersion){},
                                new SqlParameter("@url", url){},
                                new SqlParameter("@action", action){},
                                new SqlParameter("@actionTime", DateTime.Now){},
            };

            _context.Database.ExecuteSqlRaw($"INSERT INTO ACCESSLOG([SessionID],[Username],[ComputerName],[OSVersion],[Browser],[BrowserVersion],[URL],[Action],[ActionTime]) " +
                $"VALUES(@sessionID, @username, @computerName, @osVersion, @browser, @browserVersion, @URL, @action, @actionTime)", sqlParameters);

            return await Task.Run(() => true);
        }

        public async Task<bool> Save(string source, DateTime logDateTime, string message, string queryString, 
            string targetSite, string stackTrace, string serverName, string requestUrl, 
            string userAgent, string userIP, string userAuthentication, string userName)
        {
            SqlParameter[] sqlParameters = new SqlParameter[] {
                                new SqlParameter("@result", System.Data.SqlDbType.Int){Direction = System.Data.ParameterDirection.Output},
                                new SqlParameter("@Source", source){},
                                new SqlParameter("@LogDateTime", logDateTime){},
                                new SqlParameter("@Message", message){},
                                new SqlParameter("@QueryString", queryString){},
                                new SqlParameter("@TargetSite", targetSite){},
                                new SqlParameter("@StackTrace", stackTrace){},
                                new SqlParameter("@ServerName", serverName){},
                                new SqlParameter("@RequestURL", requestUrl){},
                                new SqlParameter("@UserAgent", userAgent){},
                                new SqlParameter("@UserIP", userIP){},
                                new SqlParameter("@UserAuthentication", userAuthentication){},
                                new SqlParameter("@UserName", userName){}
            };

            _context.Database.ExecuteSqlRaw($"EXECUTE @result = [dbo].[spInsertExceptionLog] " +
                $"@Source, @LogDateTime, @Message, @QueryString, @TargetSite, @StackTrace, " +
                $"@ServerName, @RequestURL, @UserAgent, @UserIP, @UserAuthentication, @UserName", sqlParameters);

            return await Task.Run(() => ((int)sqlParameters[0].Value >= 0));
        }
    }
}
