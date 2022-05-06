using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading.Tasks;

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
        public ActionResult<IEnumerable<UserDto>> List(TableViewParameters parameters)
        {
            return Ok(userRepository.Get(UserSession.Instance.User.UserID, parameters));
        }

        [HttpGet("search/{searchBy}/{isSuper:bool}")]
        public ActionResult<IEnumerable<SearchUser>> Search(string searchBy, bool isSuper)
        {
            return Ok(userRepository.Search(searchBy, isSuper));
        }

        [HttpGet("{ein}/{isSuper:bool}")]
        public async Task<ActionResult> GetByEIN(string ein, bool isSuper)
        {
            return Ok(await userRepository.GetUserByEINAsync(ein, isSuper));
        }

        [HttpPost]
        public ActionResult Post([FromBody]UserDtoToAddAndUpdate user)
        {
            return Ok(userRepository.Add(user));
        }

        [HttpPut]
        public ActionResult Update([FromBody]UserDtoToAddAndUpdate user)
        {
            return Ok(userRepository.Update(user));
        }

        [HttpDelete("{userID}")]
        public ActionResult Delete(string userID)
        {
            return Ok(userRepository.Delete(userID));
        }

        [HttpGet]
        [Route("IsDeveloper/{lanid}")]
        public ActionResult Test(string lanid)
        {
            return Ok(userRepository.IsDeveloper(lanid));
        }

        //[HttpGet("report/{userID}")]
        //public ActionResult Report(string userID)
        //{
        //    try
        //    {
        //        //url = url.Replace("\n", "");
        //        //WebRequest request = WebRequest.Create(@"https://d2e1cldb16/reportserver/Pages/ReportViewer.aspx?/HRIS/development/UsersReport&UserID=" + userID + "&rs:Format=EXCEL");
        //        WebRequest request = WebRequest.Create(@"https://d2e1cldb16/reportserver/Pages/ReportViewer.aspx?/HRIS/development/SearchStaffReport&UserID=" + userID + "&rs:Format=EXCEL");

        //        NetworkCredential credentials = new NetworkCredential(@"OSRData", "Purple12");
        //        request.Credentials = credentials;

        //        HttpWebResponse response = (HttpWebResponse)request.GetResponse();
        //        Stream stream = response.GetResponseStream();

        //        return File(stream, "application/excel");

        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}