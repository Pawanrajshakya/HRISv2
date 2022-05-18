using System.Collections.Generic;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IHeadcountRepository
    {
        public Task<List<AgencyHeadcountChartDto>> GetChartAsync();
    }
}
