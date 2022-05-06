using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.API.Controllers
{
    [Route("hris/[controller]")]
    [ApiController]
    public class AnnouncementController : BaseController
    {
        private readonly IAnnouncementRepository announcementRepository;

        public AnnouncementController(IAnnouncementRepository announcementRepository)
            : base()
        {
            this.announcementRepository = announcementRepository;
        }

        [HttpPost("list")]
        public ActionResult Get(TableViewParameters parameters)
        {
            return Ok(announcementRepository.GetList(UserSession.Instance.User.UserID, parameters));
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            return Ok(await announcementRepository.Get(UserSession.Instance.User.UserID));
        }

        [HttpGet("{id:int}")]
        public ActionResult Get(int id)
        {
            return Ok(announcementRepository.Get(UserSession.Instance.User.UserID, id));
        }

        [HttpPost]
        public ActionResult Post([FromBody]AnnouncementDto dto)
        {
            return Ok(announcementRepository.Add(dto));
        }

        [HttpPut]
        public ActionResult Update([FromBody]AnnouncementDto dto)
        {
            return Ok(announcementRepository.Update(dto));
        }

        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            return Ok(announcementRepository.Delete(UserSession.Instance.User.UserID, id));
        }

        [HttpPost("{id:int}/{priority:int}")]
        public ActionResult UpdatePriority(int id, int priority)
        {
            return Ok(announcementRepository.UpdatePriority(UserSession.Instance.User.UserID, id, priority));
        }
    }
}