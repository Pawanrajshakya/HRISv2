using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public class UserActionFilter : IActionFilter
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogRepository _logRepository;

        public UserActionFilter(IUserRepository userRepository, ILogRepository logRepository)
        {
            _userRepository = userRepository;
            _logRepository = logRepository;
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            try
            {
                _logRepository.ID = context.HttpContext.Connection.Id;
                _logRepository.URL = context.HttpContext.Request.Path;
                _logRepository.Host = context.HttpContext.Request.Host.ToString();
                _logRepository.ClientComputerAddress = context.HttpContext.Connection.RemoteIpAddress.ToString();
                _logRepository.IsAuthenticated = context.HttpContext.User.Identity.IsAuthenticated;
                _logRepository.UserName = context.HttpContext.User.Identity.Name;
                
            }
            catch (System.Exception)
            {
            }

            try
            {
                var user = _userRepository.GetByLanID(UserSession.LanID);
               
                
                if (user == null)
                {
                    _logRepository.AccessLogAsync("Unauthorized: " + UserSession.LanID ?? "");
                    context.Result = new UnauthorizedResult();
                }
                UserSession.Instance.User = user;
                _logRepository.AccessLogAsync("Login:" + UserSession.Instance.User.LanID ?? "");
            }
            catch (System.Exception ex)
            {
                _logRepository.ExceptionLogAsync(ex);
                ShareManager.AddMessage(ex.Message);
                context.Result = new ObjectResult(ex.Message);
            }
        }

        public void SendEmailToDeveloper(FilterContext context, UserDto user)
        {
            string subject = string.Concat("Information: ", System.DateTime.Now.ToLongDateString(), " ", System.DateTime.Now.ToLongTimeString(), " ", UserSession.LanID);
            System.Text.StringBuilder body = new System.Text.StringBuilder();
            body.Append("<code><b>Request Path: </b>" + context.HttpContext.Request.Path + "<br/>");
            body.Append("<code><b>Request Path: </b>" + context.HttpContext.Request.Path + "<br/>");
            body.Append("<b>Identity Name: </b>" + context.HttpContext.User.Identity.Name + "<br/>");
            body.Append("<b>IsAuthenticated: </b>" + context.HttpContext.User.Identity.IsAuthenticated + "<br/>");
            if (user != null)
            {
                body.Append("<b>User EIN: </b>" + user.EIN + "<br/>");
                body.Append("<b>User LanID: </b>" + user.LanID + "<br/>");
                body.Append("<b>User Name: </b>" + user.FirstName + " " + user.LastName + "<br/>");
                body.Append("<b>User IsSuper: </b>" + user.IsSuper.ToString() + "<br/>");
                body.Append("<b>User RoleID: </b>" + user.RoleID.ToString() + "<br/>");
                body.Append("<b>User EmailAddress: </b>" + user.EmailAddress + "<br/>");
                //if (user.Role != null)
                //    body.Append("<b>User Role: </b>" + user.Role.Description + "<br/>");
                //if (user.UserGroups != null)
                //    body.Append("<b>Groups: </b>" + string.Concat(user.UserGroups.Select(x => x.Description + ",").ToArray()));
            }
            else
            {
                body.Append(UserSession.LanID + " user not found.");
            }

            EmailManager.SendEmail(
                ShareManager.SmtpServer,
                ShareManager.From,
                ShareManager.SendTo,
                subject,
                body.ToString());
        }

    }


}
