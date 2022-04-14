using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;

namespace HRIS.API
{
    public class UserActionFilter : IActionFilter
    {
        private readonly IUserRepository _userRepository;

        public UserActionFilter(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var user = _userRepository.GetByLanID(UserSession.LanID);

            if (user == null)
                context.Result = new UnauthorizedResult();

            UserSession.Instance.User = user;

            //SendEmailToDeveloper(context, user);
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
                if (user.Role != null)
                    body.Append("<b>User Role: </b>" + user.Role.Description + "<br/>");
                if (user.UserGroups != null)
                    body.Append("<b>Groups: </b>" + string.Concat(user.UserGroups.Select(x => x.Description + ",").ToArray()));
            }
            else
            {
                body.Append(UserSession.LanID + " user not found.");
            }

            EmailManager.SendEmail(subject, body.ToString());
        }

    }


}
