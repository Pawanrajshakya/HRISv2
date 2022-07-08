using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace HRIS.API.Controllers
{
    [Route("hris/[controller]")]
    [ApiController]
    public class AnnouncementController : BaseController
    {
        private readonly IAnnouncementRepository announcementRepository;
        private readonly IHostEnvironment environment;

        public AnnouncementController(IAnnouncementRepository announcementRepository
            , IHostEnvironment environment
            , IRCRepository rcRepository
            , IDPRepository dpRepository) : base(rcRepository, dpRepository)
        {
            this.announcementRepository = announcementRepository;
            this.environment = environment;
        }

        [HttpPost("list")]
        public ActionResult Get(Pagination parameters)
        {
            return Ok(announcementRepository.GetList(UserSession.Instance.User.UserID, parameters));
        }

        [HttpGet]
        public async Task<ActionResult> GetAsync()
        {
            return Ok(await announcementRepository.GetAsync(UserSession.Instance.User.UserID));
        }

        [HttpGet("{id:int}")]
        public ActionResult Get(int id)
        {
            return Ok(announcementRepository.Get(UserSession.Instance.User.UserID, id));
        }

        [HttpPost]
        public ActionResult Post([FromBody]AnnouncementDto dto)
        {
            if (dto.CreatedBy == null || dto.CreatedBy == "")
                dto.CreatedBy = UserSession.Instance.User.UserID;

            if (!dto.DurationRestricted)
                dto.DisplayAfter = dto.DisplayUntil = "";

            if (string.IsNullOrEmpty(dto.ImageURL))
                dto.ImageURL = ShareManager.UploadFolderPath + "Default.jpg";

            return Ok(announcementRepository.Add(dto));
        }

        [HttpPut]
        public ActionResult Update([FromBody]AnnouncementDto dto)
        {
            if (dto.UpdatedBy == null || dto.UpdatedBy == "")
                dto.UpdatedBy = UserSession.Instance.User.UserID;

            if (!dto.DurationRestricted)
                dto.DisplayAfter = dto.DisplayUntil = "";

            if (string.IsNullOrEmpty(dto.ImageURL))
                dto.ImageURL = ShareManager.UploadFolderPath + "Default.jpg";

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

        [HttpPost("upload/{id:int}")]
        public async Task<ActionResult> Upload(int id, IFormFile file)
        {
            string folderPath = ShareManager.UploadFolderPath;

            if (file.Length > 0)
            {
                var fileExt = Path.GetExtension(file.FileName).ToLower();

                if (fileExt.Contains(".jpg") || fileExt.Contains(".jpeg") || fileExt.Contains(".png"))
                {
                    string filePath = Path.Combine(folderPath, file.FileName);
                    using (Stream stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                    return Ok(filePath);
                }
            }
            return BadRequest("Invalid file.");
        }
    }

    public interface IBlob
    {
        public Blob Blob { get; set; }
        public DateTime LastModified { get; set; }
        public string name { get; set; }
        public string webkitRelativePath { get; set; }
    }
}