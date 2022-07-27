using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HRIS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : BaseController
    {
        private readonly IRoleRepository roleRepository;

        public RoleController(IRoleRepository roleRepository, IRCRepository rcRepository, IDPRepository dpRepository) : base(rcRepository, dpRepository)
        {
            this.roleRepository = roleRepository;
        }

        [HttpGet("{roleID}")]
        public async Task<ActionResult> GetAsync(int roleID)
        {
            return Ok(await roleRepository.GetAsync(roleID));
        }

        [HttpGet]
        public async Task<ActionResult> GetAsync()
        {
            return Ok(await roleRepository.GetAsync());
        }
    }
}