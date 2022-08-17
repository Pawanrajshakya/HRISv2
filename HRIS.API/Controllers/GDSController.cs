using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GDSController : BaseController
    {
        private readonly IHRISReportRepository _hrisRepository;
        private readonly IGDSRepository _gdsRepository;

        public GDSController(IHRISReportRepository hrisRepository, IGDSRepository gdsRepository, IRCRepository rcRepository, IDPRepository dpRepository) : base(rcRepository, dpRepository)
        {
            _hrisRepository = hrisRepository;
            _gdsRepository = gdsRepository;
        }

        [HttpPost("ECardChart")]
        public async Task<ActionResult> ECardChartAsync()
        {
            try
            {
                string dp =
                    (UserSession.Instance.User.RoleID == 5)
                    ? string.Join(",", _dpRepository.GetByUserIDAsync(UserSession.Instance.User.UserID).Result.ToList().Select(x => x.DPCode))
                    : "";

                return Ok(await _gdsRepository.GetECardChart(UserSession.Instance.User.RoleID, dp));
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("EEOGenderChart")]
        public async Task<ActionResult> EEOGenderChartAsync()
        {
            try
            {
                return Ok(await _hrisRepository.GetGenderBreakdownChart(UserSession.Instance.User.UserID, "",""));
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("EEOAgencyDemographicChart")]
        public async Task<ActionResult> AgencyDemographicChartAsync()
        {
            try
            {
                return Ok(await _hrisRepository.GetAgencyDemographicChart(UserSession.Instance.User.UserID, "", ""));
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("EEOConfirmedReport")]
        public async Task<ActionResult> EEOConfirmedReportAsync(ReportParameters parameters)
        {
            try
            {
                if (string.IsNullOrEmpty(parameters.RcDp.RCs)) parameters.RcDp.RCs = GetRC(false);

                return Ok(await _gdsRepository.GetEEOConfirmedReport(UserSession.Instance.User.UserID,
                                                                             parameters.Pagination.PageNumber,
                                                                             parameters.Pagination.PageSize,
                                                                             parameters.Pagination.SortColumn,
                                                                             parameters.Pagination.SortOrder,
                                                                             parameters.Pagination.SearchTerm,
                                                                             parameters.RcDp.RCs));
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("EEOPendingReport")]
        public async Task<ActionResult> EEOPendingReportAsync(ReportParameters parameters)
        {
            try
            {
                if (string.IsNullOrEmpty(parameters.RcDp.RCs)) parameters.RcDp.RCs = GetRC(false);

                return Ok(await _gdsRepository.GetEEOPendingReport(UserSession.Instance.User.UserID,
                                                                             parameters.Pagination.PageNumber,
                                                                             parameters.Pagination.PageSize,
                                                                             parameters.Pagination.SortColumn,
                                                                             parameters.Pagination.SortOrder,
                                                                             parameters.Pagination.SearchTerm,
                                                                             parameters.RcDp.RCs));
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("EEOSummaryReport")]
        public async Task<ActionResult> EEOSummaryReportAsync(ReportParameters parameters)
        {
            try
            {
                if (string.IsNullOrEmpty(parameters.RcDp.RCs)) parameters.RcDp.RCs = GetRC(false);

                return Ok(await _gdsRepository.GetEEOSummaryReport(UserSession.Instance.User.UserID,
                                                                             parameters.Pagination.PageNumber,
                                                                             parameters.Pagination.PageSize,
                                                                             parameters.Pagination.SortColumn,
                                                                             parameters.Pagination.SortOrder,
                                                                             parameters.Pagination.SearchTerm,
                                                                             parameters.RcDp.RCs));
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}