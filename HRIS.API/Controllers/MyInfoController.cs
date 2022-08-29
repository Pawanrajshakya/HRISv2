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

        [HttpPost("myInfoTree")]
        public async Task<ActionResult> GetMyInfoTreeAsync()
        {
            try
            {
                UserDto dto = _userRepository.Get("cgupt6696");
                return Ok(await _repository.GetMyInfoTreeAsync(dto));
                //UserSession.Instance.User)  ; 
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
    }
}
