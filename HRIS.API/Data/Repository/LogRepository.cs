using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface ILogRepository
    {
        string UserName { get; set; }
        string ID { get; set; }
        string URL { get; set; }
        string Host { get; set; }
        string ClientComputerAddress { get; set; }
        bool IsAuthenticated { get; set; }
        public Task<bool> AccessLogAsync(string action);
        public Task<bool> ExceptionLogAsync(Exception ex);
    }

    public class LogRepository : Repository, ILogRepository
    {
        public LogRepository(HRISDataContext context, AutoMapper.IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public string ID { get; set; }
        public string URL { get; set; }
        public string Host { get; set; }
        public string ClientComputerAddress { get; set; }
        public string UserName { get; set; }
        public bool IsAuthenticated { get; set; }

        public async Task<bool> AccessLogAsync(string action)
        {
            int result = -1;
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[] {
                                new SqlParameter("@sessionID", ID??""),
                                new SqlParameter("@userName", UserName??""),
                                new SqlParameter("@browser",  UserSession.Platform ?? ""),
                                new SqlParameter("@url", URL??""),
                                new SqlParameter("@action", action??""),
                                new SqlParameter("@computerName", ClientComputerAddress ?? ""),
                                new SqlParameter("@actionTime", DateTime.Now),
            };

                result = _context.Database.ExecuteSqlRaw($"INSERT INTO ACCESSLOG([SessionID],[Username],[ComputerName],[Browser],[URL],[Action],[ActionTime]) " +
                    $"VALUES(@sessionID, @userName, @computerName, @browser, @URL, @action, @actionTime)", sqlParameters);

                return await Task.Run(() => result > 0);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task<bool> ExceptionLogAsync(Exception ex)
        {
            int result = -1;
            SqlParameter[] sqlParameters = new SqlParameter[] {
                                new SqlParameter("@result", System.Data.SqlDbType.Int ){Direction = System.Data.ParameterDirection.Output},
                                new SqlParameter("@Source", ex.Source),
                                new SqlParameter("@LogDateTime", DateTime.Now),
                                new SqlParameter("@Message", ex.Message),
                                new SqlParameter("@QueryString", ""),
                                new SqlParameter("@TargetSite", ex.TargetSite.ToString()),
                                new SqlParameter("@StackTrace", ex.StackTrace),
                                new SqlParameter("@ServerName", Host),
                                new SqlParameter("@RequestURL", URL),
                                new SqlParameter("@UserAgent", ClientComputerAddress),
                                new SqlParameter("@UserIP", Host),
                                new SqlParameter("@UserAuthentication", IsAuthenticated),
                                new SqlParameter("@UserName", UserName)
            };

            result = _context.Database.ExecuteSqlRaw($"EXECUTE @result = [dbo].[spInsertExceptionLog] " +
             $"@Source, @LogDateTime, @Message, @QueryString, @TargetSite, @StackTrace, " +
             $"@ServerName, @RequestURL, @UserAgent, @UserIP, @UserAuthentication, @UserName", sqlParameters);

            return await Task.Run(() => (int)sqlParameters[0].Value > 0);
        }
    }
}
