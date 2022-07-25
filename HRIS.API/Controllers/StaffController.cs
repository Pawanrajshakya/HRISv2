using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.API.Controllers
{
    [Route("hris/[controller]")]
    [ApiController]
    public class StaffController : BaseController
    {
        private readonly IStaffRepository _staffRepository;

        public StaffController(IStaffRepository staffRepository, IRCRepository rcRepository, IDPRepository dpRepository) : base(rcRepository, dpRepository)
        {
            _staffRepository = staffRepository;
        }

        [HttpPost("activeStaffReport")]
        public async Task<ActionResult> GetActiveStaffReportAsync(ReportParameters parameters)
        {
            return Ok(await _staffRepository.GetActiveStaff(UserSession.Instance.User.UserID
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

        [HttpPost("leaveReport")]
        public async Task<ActionResult> GetLeaveReportAsync(ReportParameters parameters)
        {
            return Ok(await _staffRepository.GetStaffLeaveReport(UserSession.Instance.User.UserID
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

        [HttpPost("ceasedReport")]
        public async Task<ActionResult> GetCeasedReportAsync(ReportParameters parameters)
        {
            return Ok(await _staffRepository.GetStaffLeaveReport(UserSession.Instance.User.UserID
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

        [HttpPost("emergencyContactInfoReport")]
        public async Task<ActionResult> GetEmergencyContactInfoReportAsync(ReportParameters parameters)
        {
            return Ok(await _staffRepository.GetStaffEmergencyContactInfoReport(UserSession.Instance.User.UserID
                , parameters.RcDp.RCs ?? ""
                , parameters.RcDp.DPs ?? ""
                , parameters.Code.Locations
                , parameters.Pagination.PageNumber
                , parameters.Pagination.PageSize
                , parameters.Pagination.SortColumn
                , parameters.Pagination.SortOrder
                , parameters.Pagination.SearchTerm));
        }

        [HttpPost("vactionRoasterReport")]
        public async Task<ActionResult> GetVacationRosterReportAsync(ReportParameters parameters)
        {
            return Ok(await _staffRepository.GetVacationRosterReport(UserSession.Instance.User.UserID
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

        [HttpPost("agencySeparation")]
        public async Task<ActionResult> GetagencySeparationAsync(AgencySeparationParameters parameters)
        {

        }

        [HttpGet("detail/{ein}")]
        public async Task<ActionResult> GetDetailAsync(string ein)
        {
            return Ok(await _staffRepository.GetDetail(UserSession.Instance.User.UserID, ein));
        }

        [HttpGet("EmergencyContactInfo/{ein}")]
        public async Task<ActionResult> GetEmergencyContactInfoAsync(string ein)
        {
            return Ok(await _staffRepository.EmergencyContacts(UserSession.Instance.User.UserID, ein));
        }

        
    }
}