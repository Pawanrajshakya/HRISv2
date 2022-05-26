using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.API.Controllers
{
    [Route("hris/[controller]")]
    [ApiController]
    public class EcardController : BaseController
    {
        private readonly IEcardRepository _ecardRepository;
        private readonly IDPRepository _dpRepository;

        public EcardController(IEcardRepository ecardRepository, IDPRepository dPRepository)
            : base()
        {
            _ecardRepository = ecardRepository;
            _dpRepository = dPRepository;
        }

        [HttpPost("GetChartAsync")]
        public async Task<ActionResult<IEnumerable<EcardChartDto>>> GetChartAsync()
        {
            string dp = "";

            if (UserSession.Instance.User.RoleID == 5)
            {
                dp = string.Join(",", _dpRepository.GetByUserIDAsync(UserSession.Instance.User.UserID).Result.ToList().Select(x => x.DPCode));
            }

            return Ok(await _ecardRepository.GetChartAsync(UserSession.Instance.User.RoleID, dp));
        }
    }
}