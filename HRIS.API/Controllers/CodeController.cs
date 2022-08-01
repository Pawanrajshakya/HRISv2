using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HRIS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CodeController : BaseController
    {
        private readonly ILocationRepository _locationRepository;
        private readonly ITitleRepository _titleRepository;
        private readonly ICSStatusRepository _cSStatusRepository;
        private readonly IEmployeeBehaviorRepository _employeeBehaviorRepository;
        private readonly ILeaveStatusRepository _leaveStatusRepository;
        private readonly IRetirementResignationFMLARepository _retirementResignationFMLARepository;

        public CodeController(
            IRCRepository rcRepository,
            IDPRepository dpRepository,
            ILocationRepository locationRepository,
            ITitleRepository titleRepository,
            ICSStatusRepository cSStatusRepository,
            IEmployeeBehaviorRepository employeeBehaviorRepository,
            ILeaveStatusRepository leaveStatusRepository,
            IRetirementResignationFMLARepository retirementResignationFMLARepository) : base(rcRepository, dpRepository)
        {
            _titleRepository = titleRepository;
            _cSStatusRepository = cSStatusRepository;
            _employeeBehaviorRepository = employeeBehaviorRepository;
            _leaveStatusRepository = leaveStatusRepository;
            _retirementResignationFMLARepository = retirementResignationFMLARepository;
            _locationRepository = locationRepository;
        }

        [HttpGet("rc/{userid?}")]
        public async Task<ActionResult> GetRCAsync(string userid = null)
        {
            if (userid == null)
                userid = UserSession.Instance.User.UserID;

            try
            {
                return Ok(await _rcRepository.GetAsync(userid));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpGet("dp/{userid?}/{rc?}")]
        public async Task<ActionResult> GetDPByUserIDAndRCAsync(string userid = null, string rc = null)
        {
            if (userid == null)
                userid = UserSession.Instance.User.UserID;
            try
            {
                return Ok(await _dpRepository.GetByUserIDAsync(userid, rc));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpGet]
        [Route("dp")]
        public async Task<ActionResult> GetDPAsync()
        {
            try
            {
                return Ok(await _dpRepository.GetAsync());
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpGet]
        [Route("location/{userid?}")]
        public async Task<ActionResult> GetLocationAsync(string userid = null)
        {
            if (userid == null)
                userid = UserSession.Instance.User.UserID;

            try
            {
                return Ok(await _locationRepository.GetAsync(userid));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpGet("title/{userid?}")]
        public async Task<ActionResult> GetTitleAsync(string userid = null)
        {
            if (userid == null)
                userid = UserSession.Instance.User.UserID;

            try
            {
                return Ok(await _titleRepository.GetAsync(userid));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpGet("bkptitle/{userid?}")]
        public async Task<ActionResult> GetBkpTitleAsync(string userid = null)
        {
            if (userid == null)
                userid = UserSession.Instance.User.UserID;

            try
            {
                return Ok(await _titleRepository.GetBackupTitleAsync(userid));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpGet("csStatus/{userid?}")]
        public async Task<ActionResult> GetCSStatusAsync(string userid = null)
        {
            if (userid == null)
                userid = UserSession.Instance.User.UserID;

            try
            {
                return Ok(await _cSStatusRepository.GetAsync(userid));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpGet("employeeBehavior/{userid?}")]
        public async Task<ActionResult> GetEmployeeBehaviorAsync(string userid = null)
        {
            if (userid == null)
                userid = UserSession.Instance.User.UserID;

            try
            {
                return Ok(await _employeeBehaviorRepository.GetAsync(userid));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpGet("leaveStatus/{userid?}")]
        public async Task<ActionResult> GetLeaveStatusAsync(string userid = null)
        {
            if (userid == null)
                userid = UserSession.Instance.User.UserID;

            try
            {
                return Ok(await _leaveStatusRepository.GetAsync(userid));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpPost("retirementResignationFMLA/{userid?}")]
        public async Task<ActionResult> GetRetirementResignationFMLAAsync(string userid = null, string rc = null, int months = 0)
        {
            if (userid == null)
                userid = UserSession.Instance.User.UserID;

            try
            {
                return Ok(await _retirementResignationFMLARepository.GetAsync(userid, rc, months));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }
    }
}