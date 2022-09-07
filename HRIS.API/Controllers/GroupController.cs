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
            try
            {
                return _groupRepository.GetByID(groupID);
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet]
        public ActionResult<IEnumerable<GroupDto>> Get()
        {
            try
            {
                return Ok(_groupRepository.Get());
            }
            catch (System.Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}