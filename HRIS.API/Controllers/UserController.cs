using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HRIS.API.Controllers
{
    [Route("hris/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        private readonly IUserRepository userRepository;

        public UserController(IUserRepository userRepository) : base() => this.userRepository = userRepository;

        [HttpGet]
        public async Task<ActionResult<UserDto>> Get() => await userRepository.GetAsync(UserSession.LanID);

        [HttpPost]
        [Route("list")]
        public ActionResult<IEnumerable<UserDto>> ListAsync(TableViewParameters parameters) => Ok(userRepository.Get(UserSession.Instance.User.UserID, parameters));

        [HttpGet("search/{searchBy}/{isSuper:bool}")]
        public ActionResult<IEnumerable<SearchUser>> Search(string searchBy, bool isSuper) => Ok(userRepository.SearchAsync(searchBy, isSuper));

        [HttpGet("{ein}/{isSuper:bool}")]
        public async Task<ActionResult> Get(string ein, bool isSuper) => Ok(await userRepository.GetAsync(ein, isSuper));

        [HttpPost]
        public ActionResult Post([FromBody]UserDtoToAddAndUpdate user) => Ok(userRepository.Add(user));

        [HttpPut]
        public ActionResult Update([FromBody]UserDtoToAddAndUpdate user) => Ok(userRepository.Update(user));

        [HttpDelete("{userID}")]
        public ActionResult Delete(string userID) => Ok(userRepository.Delete(userID));

        [HttpGet]
        [Route("IsDeveloper/{lanid}")]
        public async Task<ActionResult> IsDeveloper(string lanid) => Ok(await userRepository.IsDeveloperAsync(lanid));
    }
}