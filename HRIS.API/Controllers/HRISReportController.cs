using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HRIS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HRISReportController : BaseController
    {
        private readonly IHRISReportRepository _reportRepository;

        public HRISReportController(IHRISReportRepository reportRepository, IRCRepository rcRepository, IDPRepository dpRepository) : base(rcRepository, dpRepository)
        {
            _reportRepository = reportRepository;
        }

        [HttpPost("activeStaffReport")]
        public async Task<ActionResult> GetActiveStaffReportAsync(ReportParameters parameters)
        {
            try
            {
                return Ok(await _reportRepository.GetActiveStaffReportAsync(UserSession.Instance.User.UserID
                       , parameters.RcDp.RCs ?? ""
                       , parameters.RcDp.DPs ?? ""
                       , parameters.Code.Locations
                       , parameters.Code.Titles
                       , parameters.Code.BackupTitles
                       , parameters.Code.CSStatuses
                       , parameters.Pagination.PageNumber
                       , parameters.Pagination.PageSize
                       , parameters.Pagination.SortColumn
                       , parameters.Pagination.SortOrder
                       , parameters.Pagination.SearchTerm));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpPost("leaveReport")]
        public async Task<ActionResult> GetLeaveReportAsync(ReportParameters parameters)
        {
            try
            {
                return Ok(await _reportRepository.GetStaffLeaveReportAsync(UserSession.Instance.User.UserID
                        , parameters.RcDp.RCs ?? ""
                        , parameters.RcDp.DPs ?? ""
                        , parameters.Code.Titles
                        , parameters.Code.LvStatuses
                        , "Leave"
                        , parameters.Pagination.PageNumber
                        , parameters.Pagination.PageSize
                        , parameters.Pagination.SortColumn
                        , parameters.Pagination.SortOrder
                        , parameters.Pagination.SearchTerm));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpPost("ceasedReport")]
        public async Task<ActionResult> GetCeasedReportAsync(ReportParameters parameters)
        {
            try
            {
                return Ok(await _reportRepository.GetStaffLeaveReportAsync(UserSession.Instance.User.UserID
                        , parameters.RcDp.RCs ?? ""
                        , parameters.RcDp.DPs ?? ""
                        , parameters.Code.Titles
                        , parameters.Code.LvStatuses
                        , "Ceased"
                        , parameters.Pagination.PageNumber
                        , parameters.Pagination.PageSize
                        , parameters.Pagination.SortColumn
                        , parameters.Pagination.SortOrder
                        , parameters.Pagination.SearchTerm));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpPost("emergencyContactInfoReport")]
        public async Task<ActionResult> GetEmergencyContactInfoReportAsync(ReportParameters parameters)
        {
            try
            {
                return Ok(await _reportRepository.GetStaffEmergencyContactInfoReportAsync(UserSession.Instance.User.UserID
                        , parameters.RcDp.RCs ?? ""
                        , parameters.RcDp.DPs ?? ""
                        , parameters.Code.Locations
                        , parameters.Pagination.PageNumber
                        , parameters.Pagination.PageSize
                        , parameters.Pagination.SortColumn
                        , parameters.Pagination.SortOrder
                        , parameters.Pagination.SearchTerm));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpPost("vactionRoasterReport")]
        public async Task<ActionResult> GetVacationRosterReportAsync(ReportParameters parameters)
        {
            try
            {
                return Ok(await _reportRepository.GetVacationRosterReportAsync(UserSession.Instance.User.UserID
                , parameters.RcDp.RCs ?? ""
                , parameters.RcDp.DPs ?? ""
                , parameters.Code.Locations
                , parameters.Code.Titles
                , parameters.Pagination.PageNumber
                , parameters.Pagination.PageSize
                , parameters.Pagination.SortColumn
                , parameters.Pagination.SortOrder
                , parameters.Pagination.SearchTerm));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpPost("overtimeCitytimeReport")]
        public async Task<ActionResult> GetOvertimeCitytimeReportAsync(OvertimeParameters parameters)
        {
            try
            {
                return Ok(await _reportRepository.GetOvertimeCitytimeReportAsync(UserSession.Instance.User.UserID
                , parameters.RcDp.RCs ?? ""
                , parameters.RcDp.DPs ?? ""
                , parameters.MinDate
                , parameters.MaxDate));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        
    }
}
