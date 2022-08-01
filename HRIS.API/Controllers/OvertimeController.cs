using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;

namespace HRIS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OvertimeController : BaseController
    {
        private readonly IOvertimeRepository _overtimeRepository;

        public OvertimeController(IOvertimeRepository overtimeRepository, IRCRepository rcRepository, IDPRepository dpRepository)
            : base(rcRepository, dpRepository)
        {
            _overtimeRepository = overtimeRepository;
        }

        [HttpGet("StaffOvertimeSummary/{ein}/{calenderType}")]
        public async Task<ActionResult> GetStaffOvertimeSummary(string ein, string calenderType)
        {
            try
            {
                if (UserSession.Instance.User.Groups.Contains(3))
                {
                    return Ok(await _overtimeRepository.GetStaffOTSummary(UserSession.Instance.User.UserID, ein, calenderType));
                }
                return Ok();
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }
    }
}