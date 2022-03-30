using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HRIS.API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RCController : BaseController
    {
        private readonly IRCRepository _rcRepository;
        public RCController(IRCRepository rcRepository)
            : base()
        {
            _rcRepository = rcRepository;
        }

        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_rcRepository.Get());
        }
    }
}