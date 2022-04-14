using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace HRIS.API.Controllers
{
    [Route("hris/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        private readonly IUserRepository userRepository;
        public UserController(IUserRepository userRepository)
            : base()
        {
            this.userRepository = userRepository;
        }

        [HttpGet]
        public ActionResult<UserDto> Get()
        {
            return userRepository.GetByLanID(UserSession.LanID);
        }

        [HttpGet("{userId}")]
        public ActionResult<UserDto> Get(string userId)
        {
            if (userId.Contains("\\"))
                userId = userId.Substring(userId.LastIndexOf("\\"));

            return userRepository.GetByLanID(userId);
        }

        [HttpGet]
        [Route("all")]
        public ActionResult<IEnumerable<UserDto>> GetAll()
        {
            return Ok(userRepository.Get());
        }

        [HttpGet]
        [Route("all/{roleID:int}/{groupID:int}")]
        public ActionResult<IEnumerable<UserDto>> GetAll(int roleID, int groupID)
        {
            return Ok(userRepository.Get(roleID, groupID));
        }

        [HttpPost]
        [Route("list")]
        public ActionResult<IEnumerable<UserDto>> List(ReportParameters parameters)
        {
            return Ok(userRepository.Get(parameters));
        }

        [HttpGet]
        [Route("search/{searchBy}/{isSuper:bool}")]
        public ActionResult<IEnumerable<SearchUser>> Search(string searchBy, bool isSuper)
        {
            return Ok(userRepository.Search(searchBy, isSuper));
        }

        [HttpPost]
        [Route("test")]
        public ActionResult<UserDto> Test()
        {
            return Ok(UserSession.Instance.User);
        }
    }
}