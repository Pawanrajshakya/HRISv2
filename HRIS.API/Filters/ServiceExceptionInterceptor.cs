﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Threading.Tasks;

namespace HRIS.API.Filters
{
    public class ServiceExceptionInterceptor : IAsyncExceptionFilter
    {
        public Task OnExceptionAsync(ExceptionContext context)
        {
            var error = new 
            {
                context.HttpContext.Response.StatusCode,
                context.Exception.Message
            };
            context.Result = new JsonResult(error);
            return Task.CompletedTask;
        }
    }
}