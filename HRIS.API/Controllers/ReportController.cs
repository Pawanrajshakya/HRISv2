using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.API.Controllers
{
    [Route("hris/[controller]")]
    [ApiController]
    public class ReportController : BaseController
    {

        [HttpPost]
        public ActionResult Post(ReportParameters parameters)
        {
            try
            {
                //System.Threading.Thread.Sleep(5000);
                return File(ReportManager.Get(parameters), parameters.Detail.ContentType);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}