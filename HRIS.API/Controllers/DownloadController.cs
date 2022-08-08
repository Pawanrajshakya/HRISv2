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
        public ActionResult Post(OvertimeParameters parameters)
        {
            try
            {
                //System.Threading.Thread.Sleep(5000);
                string url = GetUrl(parameters);
                return File(ReportManager.Get(url), parameters.File.ContentType);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}