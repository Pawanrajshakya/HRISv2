using HRIS.API.Filters;
using Microsoft.AspNetCore.Mvc;

namespace HRIS.API.Controllers
{
    [ApiController]
    [HRISAuthorizeFilter]
    [ServiceFilter(typeof(UserActionFilter))]
    public class BaseController : ControllerBase
    {
    }
}