using System;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.API.Controllers
{
    [Route("hris/[controller]")]
    [ApiController]
    public class ReportController : BaseController
    {
        public ReportController(IRCRepository rcRepository, IDPRepository dpRepository) : base(rcRepository, dpRepository)
        {
        }

        [HttpPost]
        public ActionResult Post(ReportParameters parameters)
        {
            try
            {
                //System.Threading.Thread.Sleep(5000);
                return File(ReportManager.Get(parameters), parameters.File.ContentType);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}