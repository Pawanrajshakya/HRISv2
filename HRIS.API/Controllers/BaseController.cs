using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace HRIS.API.Controllers
{
    [ApiController]
    [HRISAuthorizeFilter]
    [ServiceFilter(typeof(UserActionFilter))]
    public class BaseController : ControllerBase
    {
        protected readonly IRCRepository _rcRepository;
        protected readonly IDPRepository _dpRepository;

        public BaseController(IRCRepository rcRepository, IDPRepository dpRepository)
        {
            _rcRepository = rcRepository;
            _dpRepository = dpRepository;
        }

        protected string GetDP(bool IsAgencyWise)
        {
            if (!IsAgencyWise)
            {
                return Utility.ConvertToString(
                    _dpRepository.GetAsync().Result
                    .Select(s => s.DPCode)
                    .ToList()
                    );
            }

            return string.Empty;
        }

        protected string GetRC(bool IsAgencyWise)
        {
            if (!IsAgencyWise)
            {
                var rcs = _rcRepository.GetAsync(UserSession.Instance.User.UserID).Result
                    .Select(s => s.Code)
                    .ToList();

                return Utility.ConvertToString(rcs);
            }

            return string.Empty;
        }
    }
}