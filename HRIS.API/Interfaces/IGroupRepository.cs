using System.Collections.Generic;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IGroupRepository
    {
        public IEnumerable<GroupDto> Get(string userID);
        public Task<IEnumerable<GroupDto>> GetAsync(string userID);
        public GroupDto Get(int groupID);
        public IEnumerable<GroupDto> Get();
    }
}
