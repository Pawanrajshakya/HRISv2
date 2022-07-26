﻿using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Text;
using System.Threading.Tasks;

namespace HRIS.API.Filters
{
    public class ServiceExceptionInterceptor : IAsyncExceptionFilter
    {

        public Task OnExceptionAsync(ExceptionContext context)
        {
            
            try
            {
                ShareManager.AddMessage(context.Exception.Message);

                var error = new
                {
                    context.HttpContext.Response.StatusCode,
                    context.Exception.Message,
                    context.Exception.Source,
                    context.Exception.StackTrace,
                    context.Exception.HelpLink,
                    context.Exception.TargetSite
                };

                EmailManager.SendEmail(ShareManager.SmtpServer,
                    ShareManager.From,
                    ShareManager.SendTo,
                    "HRIS v2 Exception",
                    context.Exception.Message);

                context.Result = new JsonResult(error);
                
            }
            catch (System.Exception ex)
            {
                ShareManager.AddMessage(ex.Message);
                context.Result = new JsonResult(ShareManager.GetMessage()) ;
            }
            return Task.CompletedTask;
        }
    }
}
