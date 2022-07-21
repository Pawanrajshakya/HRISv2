using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.API.Controllers
{
    [Route("hris/[controller]")]
    [ApiController]
    public class TeamController : BaseController
    {
        private readonly ITEAMRepository _teamRepository;

        public TeamController(ITEAMRepository teamRepository
            , IRCRepository rcRepository
            , IDPRepository dpRepository) : base(rcRepository, dpRepository)
        {
            _teamRepository = teamRepository;
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

        [HttpGet("TopInfractionsChartAsync")]
        public async Task<ActionResult> TopInfractionsChartAsync()
        {
            try
            {
                string rc = Utility.ConvertToString(
                _rcRepository.GetAsync(UserSession.Instance.User.UserID).Result
                .Select(x => x.Code).ToList()
                );

                return Ok(await _teamRepository.GetTopInfractionsChartAsync(rc));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("CaseCountByYearChartAsync")]
        public async Task<ActionResult> CaseCountByYearChartAsync()
        {
            try
            {
                string rc = Utility.ConvertToString(
                    _rcRepository.GetAsync(UserSession.Instance.User.UserID).Result
                    .Select(x => x.Code).ToList()
                    );

                return Ok(await _teamRepository.GetCaseCountByYearChartAsync(rc));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //GetStaffEDUDetail
        [HttpGet("StaffEDUDetail/{ein}")]
        public async Task<ActionResult> GetStaffEDUDetailAsync(string ein)
        {
            try
            {
                return Ok(await _teamRepository.GetStaffEDUDetail(UserSession.Instance.User.UserID, ein));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}