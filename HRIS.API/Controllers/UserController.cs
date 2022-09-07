using Microsoft.AspNetCore.Mvc;
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
            try
            {
                return Ok(await _userRepository.GetUserByLanIDAsync(UserSession.LanID));
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("list")]
        public ActionResult<UserDto> ListAsync(Pagination parameters)
        {
            try
            {
                return Ok(_userRepository.GetUsers(UserSession.Instance.User.UserID, parameters));
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("search/{searchBy}/{isSuper:bool}")]
        public async Task<ActionResult> Search(string searchBy, bool isSuper)
        {
            return Ok(await _userRepository.SearchAsync(searchBy, isSuper));
        }

        [HttpGet("{ein}/{isSuper:bool}")]
        public async Task<ActionResult> Get(string ein, bool isSuper)
        {
            try
            {
                return Ok(await _userRepository.GetByEINAsync(ein, isSuper));
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult Post([FromBody] UserDtoToAddAndUpdate user)
        {
            try
            {
                return Ok(_userRepository.Add(user));
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPut]
        public ActionResult Update([FromBody] UserDtoToAddAndUpdate user)
        {
            try
            {
                return Ok(_userRepository.Update(user));
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{userID}")]
        public ActionResult Delete(string userID)
        {
            try
            {
                return Ok(_userRepository.Delete(userID));
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("isDeveloper/{lanID?}")]
        public async Task<ActionResult> IsDeveloper(string? lanID)
        {
            try
            {
                if (string.IsNullOrEmpty(lanID)) lanID = UserSession.LanID;

                return Ok(await _userRepository.IsDeveloperAsync(lanID));
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("find/{ein?}")]
        public async Task<ActionResult> Find(string ein = null)
        {
            try
            {
                if (string.IsNullOrEmpty(ein))
                    return Ok(false);

                return Ok(await _userRepository.FindAsync(ein));
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}