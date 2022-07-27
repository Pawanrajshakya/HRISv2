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
                return File(ReportManager.Get(parameters), parameters.File.ContentType);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}