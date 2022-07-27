﻿using Microsoft.AspNetCore.Mvc;
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
            return Ok(await _reportRepository.GetActiveStaffReport(UserSession.Instance.User.UserID
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
            return Ok(await _reportRepository.GetStaffLeaveReport(UserSession.Instance.User.UserID
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
            return Ok(await _reportRepository.GetStaffLeaveReport(UserSession.Instance.User.UserID
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
            return Ok(await _reportRepository.GetStaffEmergencyContactInfoReport(UserSession.Instance.User.UserID
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
            return Ok(await _reportRepository.GetVacationRosterReport(UserSession.Instance.User.UserID
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
    }
}
