using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.API.Controllers
{
    [Route("hris/[controller]")]
    [ApiController]
    public class EcardController : BaseController
    {
        private readonly IEcardRepository _ecardRepository;

        public EcardController(IEcardRepository ecardRepository)
            : base()
        {
            _ecardRepository = ecardRepository;
        }

        [HttpPost]
        public async Task<ActionResult<List<EcardChartDto>>> GetAsync()
        {
            return await _ecardRepository.GetChartAsync();
        }
    }
}