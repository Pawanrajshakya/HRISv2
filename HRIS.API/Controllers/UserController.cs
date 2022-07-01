using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HRIS.API.Controllers
{
    [Route("hris/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository) : base()
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> Get()
        {
            return await _userRepository.GetAsync(UserSession.LanID);
        }

        [HttpPost]
        [Route("list")]
        public ActionResult<IEnumerable<UserDto>> ListAsync(TableViewParameters parameters) => Ok(_userRepository.Get(UserSession.Instance.User.UserID, parameters));

        [HttpGet("search/{searchBy}/{isSuper:bool}")]
        public ActionResult<IEnumerable<SearchUser>> Search(string searchBy, bool isSuper) => Ok(_userRepository.SearchAsync(searchBy, isSuper));

        [HttpGet("{ein}/{isSuper:bool}")]
        public async Task<ActionResult> Get(string ein, bool isSuper) => Ok(await _userRepository.GetAsync(ein, isSuper));

        [HttpPost]
        public ActionResult Post([FromBody]UserDtoToAddAndUpdate user) => Ok(_userRepository.Add(user));

        [HttpPut]
        public ActionResult Update([FromBody]UserDtoToAddAndUpdate user) => Ok(_userRepository.Update(user));

        [HttpDelete("{userID}")]
        public ActionResult Delete(string userID) => Ok(_userRepository.Delete(userID));

        [HttpGet]
        [Route("IsDeveloper/{lanid}")]
        public async Task<ActionResult> IsDeveloper(string lanid) => Ok(await _userRepository.IsDeveloperAsync(lanid));
    }
}