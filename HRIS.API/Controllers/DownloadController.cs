using System;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DownloadController : BaseController
    {
        public DownloadController(IRCRepository rcRepository, IDPRepository dpRepository) : base(rcRepository, dpRepository)
        {
        }

        [HttpPost]
        public ActionResult Post(ReportParameters parameters)
        {
            try
            {
                //System.Threading.Thread.Sleep(5000);
                ReportManager.ReportParameters = parameters;
                return File(ReportManager.Get(), parameters.File.ContentType);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[HttpPost("PARReport")]
        //public ActionResult Post(PARParameters parameters)
        //{
        //    try
        //    {
        //        //System.Threading.Thread.Sleep(5000);
        //        ReportManager.ReportName = parameters.ReportName;
        //        ReportManager.ReportParameters = parameters;
        //        return File(ReportManager.Get(), parameters.File.ContentType);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}