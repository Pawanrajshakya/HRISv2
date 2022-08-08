using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace HRIS.API
{
    public class HRISAuthorizeFilter : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            try
            {
                if (context.HttpContext.User.Identity.Name == null)
                    context.Result = new UnauthorizedResult();

                var developerID = context.HttpContext.Request.Headers["hris_developer_lanid"].ToString() ?? "";

                UserSession.LanID = (developerID.Length > 0) ? developerID : context.HttpContext.User.Identity.Name;

            }
            catch (Exception ex)
            {
                ShareManager.AddMessage(ex.Message);
                throw;
            }
        }
    }
}
