using System.Collections.Generic;
using HRIS.API.Interfaces;
using HRIS.API.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.API.Controllers
{
    [Route("hris/[controller]")]
    [ApiController]
    public class GroupController : BaseController
    {
        private readonly IGroupRepository _groupRepository;

        public GroupController(IGroupRepository groupRepository)
            :base()
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