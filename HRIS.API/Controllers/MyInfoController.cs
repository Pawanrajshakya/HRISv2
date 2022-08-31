using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyInfoController : BaseController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMyInfoRepository _repository;

        public MyInfoController(IUserRepository userRepository, IMyInfoRepository repository, IRCRepository rcRepository, IDPRepository dpRepository) : base(rcRepository, dpRepository)
        {
            _userRepository = userRepository;
            _repository = repository;
        }

        [HttpPost("myInfoTree/{lanid?}")]
        public async Task<ActionResult> GetMyInfoTreeForEINAsync(string lanid)
        {
            try
            {
                UserDto userDto = string.IsNullOrEmpty(lanid) ? UserSession.Instance.User : await _userRepository.GetAsync(lanid);
                return Ok(await _repository.GetMyInfoTreeAsync(userDto));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpGet("myInfoTreeForEIN/{ein}")]
        public async Task<ActionResult> GetMyInfoTreeAsync(string ein)
        {
            try
            {
                return Ok(await _repository.GetMyInfoTreeAsync(ein));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

         [HttpGet("{ein}")]
        public async Task<ActionResult> GetStaffInfoAsync(string ein)
        {
            try
            {
                return Ok(await _repository.GetStaffInfo(UserSession.Instance.User.UserID, ein));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }
    }
}
