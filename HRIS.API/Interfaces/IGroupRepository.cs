using HRIS.API.Models.DTO;
using System.Collections.Generic;

namespace HRIS.API.Interfaces
{
    public interface IGroupRepository
    {
        public GroupDto Get(int groupID);
        public IEnumerable<GroupDto> Get();
    }
}
