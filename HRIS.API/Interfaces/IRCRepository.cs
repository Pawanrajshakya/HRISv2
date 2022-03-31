using System.Collections.Generic;

namespace HRIS.API
{
    public interface IRCRepository
    {
        public IEnumerable<RCDto> Get();
    }
}
