using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HRIS.API.Controllers
{
    [Route("hris/[controller]")]
    [ApiController]
    public class CodeController : BaseController
    {
        private readonly IRCRepository _rcRepository;
        private readonly IDPRepository _dpRepository;

        public CodeController(
            IRCRepository rcRepository,
            IDPRepository dpRepository
            )
            : base()
        {
            _rcRepository = rcRepository;
            _dpRepository = dpRepository;
        }

        [HttpGet]
        [Route("rc")]
        public async Task<ActionResult> GetRC()
        {
            return Ok(await _rcRepository.GetAsync());
        }

        [HttpGet]
        [Route("dp/{rc}")]
        public async Task<ActionResult> GetDPByRC(string rc)
        {
            return Ok(await _dpRepository.GetAsync(rc));
        }

        [HttpGet]
        [Route("dp")]
        public async Task<ActionResult> GetDP()
        {
            return Ok(await _dpRepository.GetAsync());
        }
    }
}