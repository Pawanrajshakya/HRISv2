using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.API.Controllers
{
    [Route("api/[controller]")]
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

        [HttpGet("PendingCasesChartAsync/{rc?}")]
        public async Task<ActionResult> PendingCasesChartAsync(string rc)
        {
            try
            {
                string _rc = string.IsNullOrEmpty(rc) ?
                 Utility.ConvertToString(
                 _rcRepository.GetAsync(UserSession.Instance.User.UserID).Result
                 .Select(x => x.Code).ToList()
                 ) : rc;

                return Ok(await _teamRepository.GetPendingCasesChartAsync(_rc));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpGet("TopInfractionsChartAsync/{rc?}")]
        public async Task<ActionResult> TopInfractionsChartAsync(string rc)
        {
            try
            {
                string _rc = string.IsNullOrEmpty(rc) ?
                Utility.ConvertToString(
                _rcRepository.GetAsync(UserSession.Instance.User.UserID).Result
                .Select(x => x.Code).ToList()
                ) : rc;

                return Ok(await _teamRepository.GetTopInfractionsChartAsync(_rc));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("CaseCountByYearChartAsync/{rc?}")]
        public async Task<ActionResult> CaseCountByYearChartAsync(string rc)
        {
            try
            {
                string _rc = string.IsNullOrEmpty(rc) ?
                Utility.ConvertToString(
                _rcRepository.GetAsync(UserSession.Instance.User.UserID).Result
                .Select(x => x.Code).ToList()
                ) : rc;

                return Ok(await _teamRepository.GetCaseCountByYearChartAsync(_rc));
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
                return Ok(await _teamRepository.GetStaffEDUDetailAsync(UserSession.Instance.User.UserID, ein));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}