using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IDPRepository
    {
        public Task<IEnumerable<DPDto>> GetAsync(string rc = "");
    }
}
