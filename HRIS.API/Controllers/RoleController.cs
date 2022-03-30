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
    public class RoleController : BaseController
    {
        private readonly IRoleRepository roleRepository;

        public RoleController(IRoleRepository roleRepository)
            : base()
        {
            this.roleRepository = roleRepository;
        }

        [HttpGet("{roleID}")]
        public ActionResult Get(int roleID)
        {
            return Ok(roleRepository.Get(roleID));
        }

        [HttpGet]
        public ActionResult Get()
        {
            return Ok(roleRepository.Get());
        }
    }
}