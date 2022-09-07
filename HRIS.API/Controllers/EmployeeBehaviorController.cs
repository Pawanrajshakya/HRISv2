using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HRIS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class EmployeeBehaviorController : BaseController
    {
        private readonly IEmployeeBehaviorRepository _employeeBehaviorRepository;

        public EmployeeBehaviorController(IEmployeeBehaviorRepository employeeBehaviorRepository, IRCRepository rcRepository, IDPRepository dpRepository) : base(rcRepository, dpRepository)
        {
            _employeeBehaviorRepository = employeeBehaviorRepository;
        }

        [HttpPost("employeeBehaviorChartAsync")]
        public async Task<ActionResult> GetEmployeeBehaviorChartAsync(EmployeeBehaviorParameters parameters)
        {
            try
            {
                return Ok(await _employeeBehaviorRepository.GetChartAsync(UserSession.Instance.User.UserID, parameters.StartDate,
                    parameters.EndDate, parameters.RequestStatus, parameters.JobCenters, parameters.FoodCenters,
                    parameters.Facilities, parameters.IsMonthView, parameters.YearMonth));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }
    }
}
