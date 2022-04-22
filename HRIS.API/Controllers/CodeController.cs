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
        [Route("rc/{userid?}")]
        public async Task<ActionResult> GetRC(string userid = null)
        {
            if (userid == null)
                userid = UserSession.Instance.User.UserID;

            return Ok(await _rcRepository.GetAsync(userid));
        }

        [HttpGet]
        [Route("dp/{userid?}/{rc?}")]
        public async Task<ActionResult> GetDPByUserIDAndRC(string userid = null, string rc = null)
        {
            if (userid == null)
                userid = UserSession.Instance.User.UserID;
            return Ok(await _dpRepository.GetByUserIDAsync(userid, rc));
        }

        [HttpGet]
        [Route("dp")]
        public async Task<ActionResult> GetDPAsync()
        {
            return Ok(await _dpRepository.GetAsync());
        }
    }
}