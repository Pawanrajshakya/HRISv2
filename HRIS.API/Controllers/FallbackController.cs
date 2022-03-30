using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FallbackController : ControllerBase
    {
        public ActionResult Index()
        {
            return PhysicalFile(
                Path.Combine(
                    Directory.GetCurrentDirectory(), "ClientApp", "index.html"),
                "text/HTML");
        }
    }
}