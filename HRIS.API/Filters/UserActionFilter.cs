using HRIS.API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;

namespace HRIS.API.Filters
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
            //bool hasRole = false;
            //bool hasGroup = false;

            var user = _userRepository.GetByLanID(Helpers.UserSession.LanID);

            if (user == null)
                context.Result = new UnauthorizedResult();

            Helpers.UserSession.Instance.User = user;

            //if (Helpers.UserSession.Roles.ToList().Contains((Models._Role)Helpers.UserSession.Instance.User.RoleID))
            //    hasRole = true;

            //foreach (var group in Helpers.UserSession.Instance.User.UserGroups)
            //{
            //    if (Helpers.UserSession.Groups.ToList().Contains((Models._Group)group.GroupID))
            //    {
            //        hasGroup = true;
            //        break;
            //    }
            //}

            //if (!hasRole || !hasGroup)
            //    context.Result = new NotFoundResult();
        }
    }
}
