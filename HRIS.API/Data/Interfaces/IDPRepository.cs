using System.Collections.Generic;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IDPRepository
    {
        public Task<IEnumerable<DPDto>> GetAsync();
        public IEnumerable<DPDto> Get(string userid = null);
        public Task<IEnumerable<DPDto>> GetByUserIDAsync(string userid, string rc = "");
    }
}
