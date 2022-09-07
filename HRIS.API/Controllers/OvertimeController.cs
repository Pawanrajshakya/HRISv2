using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;

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
                    return Ok(await _overtimeRepository.GetStaffOvertimeSummaryAsync(UserSession.Instance.User.UserID, ein, calenderType));
                }
                return Ok();
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpGet("actualOT/{rcs}")]
        public async Task<ActionResult> GetActualOTAsync(string rcs)
        {
            try
            {
                if (UserSession.Instance.User.Groups.Contains(3))
                {
                    if (string.IsNullOrEmpty(rcs) || rcs == "*") rcs = GetRC(false);

                    return Ok(await _overtimeRepository.GetActualOvertimeAsync(UserSession.Instance.User.UserID, rcs.Replace(',', '|')));
                }
                return NotFound();
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpGet("budgetedOT/{rcs}/{year}")]
        public async Task<ActionResult> GetBudgetedOTAsync(string rcs, string year = "C")
        {
            try
            {
                if (UserSession.Instance.User.Groups.Contains(3))
                {
                    if (string.IsNullOrEmpty(rcs) || rcs == "*") rcs = GetRC(false);


                    return Ok(await _overtimeRepository.GetBudgetedOvertimeAsync(UserSession.Instance.User.UserID, rcs.Replace(',', '|'), year));
                }
                return NotFound();
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpPost("overtimeReport")]
        public async Task<ActionResult> GetOvertimeReportAsync(OvertimeParameters parameters)
        {
            try
            {
                if (UserSession.Instance.User.Groups.Contains(3))
                {
                    return Ok(await _overtimeRepository.GetOvertimeReportAsync(UserSession.Instance.User.UserID
                    , rcs: string.IsNullOrEmpty(parameters.RcDp.RCs) ? GetRC(false) : parameters.RcDp.RCs
                    , dps: string.IsNullOrEmpty(parameters.RcDp.DPs) ? GetDP(false) : parameters.RcDp.DPs
                    , isCalender: parameters.IsCalendarYear ? "Calendar" : "Fiscal"
                    , roleID: UserSession.Instance.User.RoleID
                    , pageNumber: parameters.Pagination.PageNumber
                    , pageSize: parameters.Pagination.PageSize
                    , sortColumn: parameters.Pagination.SortColumn
                    , sortOrder: parameters.Pagination.SortOrder
                    , searchTerm: parameters.Pagination.SearchTerm));
                }
                return NotFound();
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("overtimeEarnedAnalysisReport")]
        public async Task<ActionResult> GetOvertimeEarnedAnalysisReportAsync(OvertimeParameters parameters)
        {
            try
            {
                if (UserSession.Instance.User.Groups.Contains(3))
                {
                    return Ok(await _overtimeRepository.GetOvertimeEarnedAnalysisReportAsync(
                    userid: UserSession.Instance.User.UserID
                    , rcs: string.IsNullOrEmpty(parameters.RcDp.RCs) ? GetRC(false) : parameters.RcDp.RCs
                    , year: parameters.Year.ToString()
                    , isDateEarned: parameters.IsDateEarned
                    , pageNumber: parameters.Pagination.PageNumber
                    , pageSize: parameters.Pagination.PageSize
                    , sortColumn: parameters.Pagination.SortColumn
                    , sortOrder: parameters.Pagination.SortOrder
                    , searchTerm: parameters.Pagination.SearchTerm));
                }
                return NotFound();
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}