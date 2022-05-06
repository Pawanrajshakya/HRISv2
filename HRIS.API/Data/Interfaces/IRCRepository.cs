using System.Collections.Generic;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IRCRepository
    {
        public Task<IEnumerable<RCDto>> GetAsync(string userid);
        public IEnumerable<RCDto> Get(string userid);
    }
}
