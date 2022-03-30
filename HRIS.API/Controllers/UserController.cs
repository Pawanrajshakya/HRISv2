using HRIS.API.Filters;
using HRIS.API.Interfaces;
using HRIS.API.Models;
using HRIS.API.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace HRIS.API.Controllers
{
    [Route("api/[controller]")]
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
            return userRepository.GetByLanID(Helpers.UserSession.LanID);
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

        [HttpPost]
        [Route("test")]
        public ActionResult<UserDto> Test()
        {
            return Ok(Helpers.UserSession.Instance.User);
        }
    }
}