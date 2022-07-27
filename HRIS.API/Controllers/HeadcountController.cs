using System;
using System.Collections.Generic;
using System.Linq;
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

        [HttpPost("GetChartAsync")]
        public async Task<ActionResult<List<AgencyHeadcountChartDto>>> GetChartAsync()
        {
            return await _headcountRepository.GetChartAsync(UserSession.Instance.User.UserID, "", "");
        }
    }
}