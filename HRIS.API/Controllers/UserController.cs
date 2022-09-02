using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HRIS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository, IRCRepository rcRepository
            , IDPRepository dpRepository) : base(rcRepository, dpRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            return Ok(await _userRepository.GetAsync(UserSession.LanID));
        }

        [HttpPost("list")]
        public ActionResult<UserDto> ListAsync(Pagination parameters) => Ok(_userRepository.Get(UserSession.Instance.User.UserID, parameters));

        [HttpGet("search/{searchBy}/{isSuper:bool}")]
        public  async Task<ActionResult> Search(string searchBy, bool isSuper)
        {
            return Ok( await _userRepository.SearchAsync(searchBy, isSuper));
        }

        [HttpGet("{ein}/{isSuper:bool}")]
        public async Task<ActionResult> Get(string ein, bool isSuper) => Ok(await _userRepository.GetAsync(ein, isSuper));

        [HttpPost]
        public ActionResult Post([FromBody] UserDtoToAddAndUpdate user) => Ok(_userRepository.Add(user));

        [HttpPut]
        public ActionResult Update([FromBody] UserDtoToAddAndUpdate user) => Ok(_userRepository.Update(user));

        [HttpDelete("{userID}")]
        public ActionResult Delete(string userID) => Ok(_userRepository.Delete(userID));

        [HttpGet]
        [Route("IsDeveloper/{lanid}")]
        public async Task<ActionResult> IsDeveloper(string lanid) => Ok(await _userRepository.IsDeveloperAsync(lanid));
    }
}