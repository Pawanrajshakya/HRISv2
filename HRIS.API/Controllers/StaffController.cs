using System.Linq;
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

        [HttpPost("list")]
        public async Task<ActionResult> GetListAsync(ReportParameters parameters)
        {
            string RCs = string.IsNullOrEmpty(parameters.RcDp.RCs) ? GetRC(parameters.RcDp.IsAgencyWise) : parameters.RcDp.RCs;
            string DPs = string.IsNullOrEmpty(parameters.RcDp.DPs) ? GetDP(parameters.RcDp.IsAgencyWise) : parameters.RcDp.DPs;

            return Ok(await _staffRepository.Get(UserSession.Instance.User.UserID
                , RCs
                , DPs
                , parameters.Code.Locations
                , parameters.Code.Titles
                , parameters.Code.BackupTitles
                , parameters.Code.CSStatus
                , parameters.Pagination.PageNumber
                , parameters.Pagination.PageSize
                , parameters.Pagination.SortColumn
                , parameters.Pagination.SortOrder
                , parameters.Pagination.SearchTerm));
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