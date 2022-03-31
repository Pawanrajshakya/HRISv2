using Microsoft.AspNetCore.Mvc;

namespace HRIS.API.Controllers
{
    [Route("hris/[controller]")]
    [ApiController]
    public class RCController : BaseController
    {
        private readonly IRCRepository _rcRepository;
        public RCController(IRCRepository rcRepository)
            : base()
        {
            _rcRepository = rcRepository;
        }

        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_rcRepository.Get());
        }
    }
}