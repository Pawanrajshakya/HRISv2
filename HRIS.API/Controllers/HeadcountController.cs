using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HeadcountController : BaseController
    {
        private readonly IHeadcountRepository _headcountRepository;

        public HeadcountController(IHeadcountRepository headcountRepository, IRCRepository rcRepository, IDPRepository dpRepository) : base(rcRepository, dpRepository)
        {
            _headcountRepository = headcountRepository;
        }

        [HttpGet("chart")]
        public async Task<ActionResult> GetChartAsync()
        {
            try
            {
                return Ok(await _headcountRepository.GetChartAsync(UserSession.Instance.User.UserID,
                                                                   "",
                                                                   ""));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpPost("chart")]
        public async Task<ActionResult> GetChartAsync(ReportParameters parameters)
        {
            try
            {
                return Ok(await _headcountRepository.GetChartAsync(UserSession.Instance.User.UserID,
                                                                   parameters.RcDp.RCs,
                                                                   ""));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        //public Task<List<HeadcountReportDto>> GetHeadcountReportAsync
        //    (string userID, string rcs, string dps, int pageNumber = 1, int pageSize = 10,
        //    string sortColumn = "Division_Unit", string sortOrder = "asc", string searchTerm = "");
        [HttpPost("report")]
        public async Task<ActionResult> GetHeadcountReportAsync(ReportParameters parameters)
        {
            try
            {
                return Ok(await _headcountRepository.GetHeadcountReportAsync(UserSession.Instance.User.UserID,
                                                                             parameters.RcDp.RCs,
                                                                             parameters.RcDp.DPs,
                                                                             parameters.Pagination.PageNumber,
                                                                             parameters.Pagination.PageSize,
                                                                             parameters.Pagination.SortColumn,
                                                                             parameters.Pagination.SortOrder,
                                                                             parameters.Pagination.SearchTerm));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        //public Task<List<HeadCountTitleSummaryReportDto>> GetPagedHeadcountTitleSummaryReportAsync
        //    (string userID, string rcs, string titles, int pageNumber = 1, int pageSize = 10,
        //    string sortColumn = "RC", string sortOrder = "asc", string searchTerm = "");
        [HttpPost("titleSummaryReport")]
        public async Task<ActionResult> GetPagedHeadcountTitleSummaryReportAsync(ReportParameters parameters)
        {
            try
            {
                return Ok(await _headcountRepository.GetPagedHeadcountTitleSummaryReportAsync(UserSession.Instance.User.UserID,
                                                                                              parameters.RcDp.RCs,
                                                                                              parameters.Code.Titles,
                                                                                              parameters.Pagination.PageNumber,
                                                                                              parameters.Pagination.PageSize,
                                                                                              parameters.Pagination.SortColumn,
                                                                                              parameters.Pagination.SortOrder,
                                                                                              parameters.Pagination.SearchTerm));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        //public Task<List<HeadCountTitleAndBudgetReconciliationSummaryReport>> GetPagedHeadcountTitleAndBudgetReconciliationSummaryReportAsync
        //    (string userID, string rcs, string titles, int pageNumber = 1, int pageSize = 10,
        //    string sortColumn = "RC", string sortOrder = "asc", string searchTerm = "");
        [HttpPost("titleAndBudgetReconciliationSummary")]
        public async Task<ActionResult> GetPagedHeadcountTitleAndBudgetReconciliationSummaryReportAsync(ReportParameters parameters)
        {
            try
            {
                return Ok(await _headcountRepository.GetPagedHeadcountTitleAndBudgetReconciliationSummaryReportAsync(UserSession.Instance.User.UserID,
                                                                                                                     parameters.RcDp.RCs,
                                                                                                                     parameters.Code.Titles,
                                                                                                                     parameters.Pagination.PageNumber,
                                                                                                                     parameters.Pagination.PageSize,
                                                                                                                     parameters.Pagination.SortColumn,
                                                                                                                     parameters.Pagination.SortOrder,
                                                                                                                     parameters.Pagination.SearchTerm));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        //public Task<List<HeadcountTitleAndBudgetSummaryReport>> GetPagedHeadcountTitleAndBudgetSummaryReportAsync
        //    (string userID, string rcs, string titles, int pageNumber = 1, int pageSize = 10,
        //    string sortColumn = "RC", string sortOrder = "asc", string searchTerm = "");
        [HttpPost("titleAndBudgetSummary")]
        public async Task<ActionResult> GetPagedHeadcountTitleAndBudgetSummaryReportAsync(ReportParameters parameters)
        {
            try
            {
                return Ok(await _headcountRepository.GetPagedHeadcountTitleAndBudgetSummaryReportAsync(UserSession.Instance.User.UserID,
                                                                                                       parameters.RcDp.RCs,
                                                                                                       parameters.Code.Titles,
                                                                                                       parameters.Pagination.PageNumber,
                                                                                                       parameters.Pagination.PageSize,
                                                                                                       parameters.Pagination.SortColumn,
                                                                                                       parameters.Pagination.SortOrder,
                                                                                                       parameters.Pagination.SearchTerm));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        //public Task<List<HeadcountPMSEmployeeDetailReport>> GetPagedHeadcountPMSEmployeeDetailReportsAsync
        //    (string userID, string rcs, string dps, string leaveStatus, string titles, int pageNumber = 1, int pageSize = 10,
        //    string sortColumn = "RC", string sortOrder = "asc", string searchTerm = "");
        [HttpPost("pmsEmployeeDetail")]
        public async Task<ActionResult> GetPagedHeadcountPMSEmployeeDetailReportsAsync(ReportParameters parameters)
        {
            try
            {
                return Ok(await _headcountRepository.GetPagedHeadcountPMSEmployeeDetailReportsAsync(UserSession.Instance.User.UserID,
                                                                                                    parameters.RcDp.RCs,
                                                                                                    parameters.RcDp.DPs,
                                                                                                    parameters.Code.LvStatuses,
                                                                                                    parameters.Code.Titles,
                                                                                                    parameters.Pagination.PageNumber,
                                                                                                    parameters.Pagination.PageSize,
                                                                                                    parameters.Pagination.SortColumn,
                                                                                                    parameters.Pagination.SortOrder,
                                                                                                    parameters.Pagination.SearchTerm));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }
    }
}