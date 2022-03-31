using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HRIS.API.Filters;
using HRIS.API.Interfaces;
using HRIS.API.Models.DTO;
using Microsoft.AspNetCore.Http;
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
        //[ServiceFilter(typeof(UserActionFilter))]
        public ActionResult<List<EcardChartDto>> Get()
        {
            return _ecardRepository.Get();
        }
    }
}