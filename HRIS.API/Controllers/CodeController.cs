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
        private readonly ILocationRepository _locationRepository;

        public CodeController(
            IRCRepository rcRepository,
            IDPRepository dpRepository,
            ILocationRepository locationRepository
            )
            : base()
        {
            _rcRepository = rcRepository;
            _dpRepository = dpRepository;
            _locationRepository = locationRepository;
        }

        [HttpGet]
        [Route("rc/{userid?}")]
        public async Task<ActionResult> GetRCAsync(string userid = null)
        {
            if (userid == null)
                userid = UserSession.Instance.User.UserID;

            return Ok(await _rcRepository.GetAsync(userid));
        }

        [HttpGet]
        [Route("dp/{userid?}/{rc?}")]
        public async Task<ActionResult> GetDPByUserIDAndRCAsync(string userid = null, string rc = null)
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

        [HttpGet]
        [Route("location/{userid?}")]
        public async Task<ActionResult> GetLocationAsync(string userid = null)
        {
            if (userid == null)
                userid = UserSession.Instance.User.UserID;

            return Ok(await _locationRepository.GetAsync(userid));
        }
    }
}