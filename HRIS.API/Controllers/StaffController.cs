using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : BaseController
    {
        private readonly IStaffRepository _staffRepository;

        public StaffController(IStaffRepository staffRepository, IRCRepository rcRepository, IDPRepository dpRepository) : base(rcRepository, dpRepository)
        {
            _staffRepository = staffRepository;
        }

        [HttpGet("detail/{ein}")]
        public async Task<ActionResult> GetDetailAsync(string ein)
        {
            try
            {
                return Ok(await _staffRepository.GetDetail(UserSession.Instance.User.UserID, ein));
            }
            catch (System.Exception) { throw; }
        }

        [HttpGet("EmergencyContactInfo/{ein}")]
        public async Task<ActionResult> GetEmergencyContactInfoAsync(string ein)
        {
            try
            {
                return Ok(await _staffRepository.EmergencyContacts(UserSession.Instance.User.UserID, ein));
            }
            catch (System.Exception) { throw; }
        }
    }
}