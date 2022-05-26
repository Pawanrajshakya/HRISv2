using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.API.Controllers
{
    [Route("hris/[controller]")]
    [ApiController]
    public class TeamController : BaseController
    {
        private readonly ITeamRepository _teamRepository;
        private readonly IRCRepository _rcRepository;

        public TeamController(ITeamRepository teamRepository, IRCRepository rcRepository)
            : base()
        {
            _teamRepository = teamRepository;
            _rcRepository = rcRepository;
        }

        [HttpGet("PendingCasesChartAsync")]
        public async Task<ActionResult> PendingCasesChartAsync()
        {
            string rc = Utility.ConvertToString(
                _rcRepository.GetAsync(UserSession.Instance.User.UserID).Result
                .Select(x => x.Code).ToList()
                );

            return Ok(await _teamRepository.GetPendingCasesChartAsync(rc));
        }
    }
}