using Microsoft.AspNetCore.Mvc;

namespace HRIS.API.Controllers
{
    [Route("hris/[controller]")]
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