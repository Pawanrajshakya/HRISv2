using System.Collections.Generic;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IAnnouncementRepository
    {
        public IEnumerable<AnnouncementListDto> GetList(string userID, TableViewParameters _reportParameters);
        public Task<IEnumerable<AnnouncementSummaryDto>> Get(string userID);
        public IEnumerable<AnnouncementDto> Get(string userID, int ID);
        public bool Add(AnnouncementDto announcement);
        public bool Update(AnnouncementDto announcement);
        public bool Delete(string userID, int ID);
        public bool UpdatePriority(string userID, int ID, int Priority);
    }
}
