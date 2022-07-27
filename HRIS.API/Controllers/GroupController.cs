using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : BaseController
    {
        private readonly IGroupRepository _groupRepository;

        public GroupController(IGroupRepository groupRepository,
            IRCRepository rcRepository,
            IDPRepository dpRepository) : base(rcRepository, dpRepository)
        {
            _groupRepository = groupRepository;
        }

        [HttpGet("{groupID}")]
        public ActionResult<GroupDto> Get(int groupID)
        {
            return _groupRepository.Get(groupID);
        }

        [HttpGet]
        public ActionResult<IEnumerable<GroupDto>> Get()
        {
            return Ok(_groupRepository.Get());
        }
    }
}