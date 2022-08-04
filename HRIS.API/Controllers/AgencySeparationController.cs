using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgencySeparationController : BaseController
    {
        private readonly IAgencySeparationRepository _agencySeparationRepository;

        public AgencySeparationController(IAgencySeparationRepository agencySeparationRepository, IRCRepository rcRepository, IDPRepository dpRepository) : base(rcRepository, dpRepository)
        {
            _agencySeparationRepository = agencySeparationRepository;
        }

        [HttpPost("summary")]
        public async Task<ActionResult> 
            GetAgencySeparationAsync(AgencySeparationParameters parameters)
        {
            try
            {
                IEnumerable<SeparationSummaryDto> list = await _agencySeparationRepository.GetGetAgencySeparationSummary(UserSession.Instance.User.UserID
                , parameters.RcDp.RCs ?? ""
                , parameters.RcDp.DPs ?? ""
                , parameters.IsCalendarYear
                , parameters.Year);

            return Ok(list
                .OrderBy(c => c.ReasonDesc)
                .ToList());
            
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("chart")]
        public async Task<ActionResult> GetAgencySeparationChartAsync(AgencySeparationParameters parameters)
        {
            try { 
            IEnumerable<SeparationSummaryDto> list = await _agencySeparationRepository.GetGetAgencySeparationSummary(UserSession.Instance.User.UserID
                , parameters.RcDp.RCs ?? ""
                , parameters.RcDp.DPs ?? ""
                , parameters.IsCalendarYear
                , parameters.Year);

            return Ok(list
                .GroupBy(x => x.ReasonDesc)
                .Select(y => new AgencySeparationChart
                {
                    Description = y.Key,
                    Total = y.Sum(x => x.Count)
                })
            .OrderBy(c => c.Description)
            .ToList());
        }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
    }
}
    }
}
