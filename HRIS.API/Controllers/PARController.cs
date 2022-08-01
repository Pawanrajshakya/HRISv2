using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HRIS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PARController : BaseController
    {
        private readonly IPARRepository _reportRepository;

        public PARController(IPARRepository reportRepository, IRCRepository rcRepository, IDPRepository dpRepository) : base(rcRepository, dpRepository)
        {
            _reportRepository = reportRepository;
        }

        [HttpPost("report")]
        public async Task<ActionResult> GetPARReportAsync(ReportParameters parameters)
        {
            try
            {

                return Ok(await _reportRepository.Get(UserSession.Instance.User.UserID
                    , dateFrom: parameters.DateFrom
                    , dateTo: parameters.DateTo
                    , openClose: (parameters.OpenClose == null ? "Open" : parameters.OpenClose)
                    , rcs: parameters.RcDp.RCs ?? ""
                    , dps: parameters.RcDp.DPs ?? ""
                    , titles: parameters.Code.Titles
                    , locations: parameters.Code.Locations
                    , pageNumber: parameters.Pagination.PageNumber
                    , pageSize: parameters.Pagination.PageSize
                    , sortColumn: parameters.Pagination.SortColumn
                    , sortOrder: parameters.Pagination.SortOrder
                    , searchTerm: parameters.Pagination.SearchTerm));
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("detail/{reqNumber}")]
        public async Task<ActionResult> GetPARReportAsync(string reqNumber)
        {
            try
            {
                return Ok(await _reportRepository.Get(reqNumber));
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
