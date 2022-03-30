using HRIS.API.Models;
using HRIS.API.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API.Interfaces
{
    public interface IRCRepository
    {
        public IEnumerable<RCDto> Get();
    }
}
