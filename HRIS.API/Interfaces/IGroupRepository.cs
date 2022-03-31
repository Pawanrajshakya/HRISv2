using System.Collections.Generic;

namespace HRIS.API
{
    public interface IGroupRepository
    {
        public GroupDto Get(int groupID);
        public IEnumerable<GroupDto> Get();
    }
}
