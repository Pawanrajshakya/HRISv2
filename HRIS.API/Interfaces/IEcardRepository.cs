using HRIS.API.Models.DTO;
using System.Collections.Generic;

namespace HRIS.API.Interfaces
{
    public interface IEcardRepository
    {
        public List<EcardChartDto> Get();
    }
}
