using System;
using System.IO;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace HRIS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnnouncementController : BaseController
    {
        private readonly IAnnouncementRepository announcementRepository;
        //private readonly IHostEnvironment environment;

        public AnnouncementController(IAnnouncementRepository announcementRepository
            //, IHostEnvironment environment
            , IRCRepository rcRepository
            , IDPRepository dpRepository) : base(rcRepository, dpRepository)
        {
            this.announcementRepository = announcementRepository;
            //this.environment = environment;
        }

        [HttpPost("list")]
        public ActionResult GetList(Pagination parameters)
        {
            try
            {
                return Ok(announcementRepository.GetList(UserSession.Instance.User.UserID, parameters));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpGet]
        public async Task<ActionResult> GetAsync()
        {
            try
            {
                return Ok(await announcementRepository.GetAsync(UserSession.Instance.User.UserID));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpGet("{id:int}")]
        public ActionResult Get(int id)
        {
            try
            {
                return Ok(announcementRepository.Get(UserSession.Instance.User.UserID, id));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpPost]
        public ActionResult Post([FromBody] AnnouncementDto dto)
        {
            if (dto.CreatedBy == null || dto.CreatedBy == "")
                dto.CreatedBy = UserSession.Instance.User.UserID;

            if (!dto.DurationRestricted)
                dto.DisplayAfter = dto.DisplayUntil = "";

            if (string.IsNullOrEmpty(dto.ImageURL))
                dto.ImageURL = ShareManager.UploadFolderPath + "Default.jpg";
            try
            {
                return Ok(announcementRepository.Add(dto));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpPut]
        public ActionResult Put([FromBody] AnnouncementDto dto)
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
            try
            {
                return Ok(announcementRepository.Delete(UserSession.Instance.User.UserID, id));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
        }

        [HttpPost("{id:int}/{priority:int}")]
        public ActionResult UpdatePriority(int id, int priority)
        {
            try
            {
                return Ok(announcementRepository.UpdatePriority(UserSession.Instance.User.UserID, id, priority));
            }
            catch (System.Exception ex) { return NotFound(ex.Message); }
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
                    try
                    {
                        return Ok(filePath);
                    }
                    catch (System.Exception ex) { return NotFound(ex.Message); }
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