using System.Collections.Generic;

namespace HRIS.API
{
    public interface IEcardRepository
    {
        public List<EcardChartDto> Get();
    }
}
