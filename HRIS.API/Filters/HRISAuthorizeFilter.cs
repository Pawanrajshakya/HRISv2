using HRIS.API.Helpers;
using HRIS.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace HRIS.API.Filters
{
    public class HRISAuthorizeFilter : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (context.HttpContext.User.Identity.Name == null)
                context.Result = new UnauthorizedResult();

            var developerID = context.HttpContext.Request.Headers["hris_developer_lanid"].ToString() ?? "";

            UserSession.LanID = (developerID.Length > 0) ? developerID : context.HttpContext.User.Identity.Name;

            //new JsonResult(new { a = "error" });
            //new UnauthorizedResult(); 
            //new StatusCodeResult(StatusCodes.Status401Unauthorized);
        }
    }
}
