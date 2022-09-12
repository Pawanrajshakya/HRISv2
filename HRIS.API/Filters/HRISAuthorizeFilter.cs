using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using UAParser;

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
                //UserSession.Platform = context.HttpContext.Request.Headers["platform"].ToString() ?? "NA";
                //UserSession.Platform = context.HttpContext.Request.Headers["User-Agent"].ToString() ?? "NA";
                var userAgent = context.HttpContext.Request.Headers["User-Agent"];
                var uaParser = Parser.GetDefault();
                ClientInfo c = uaParser.Parse(userAgent);
                UserSession.Platform = c.ToString();
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
