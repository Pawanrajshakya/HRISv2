using HRIS.API.Models.DTO;
using System.Collections.Generic;

namespace HRIS.API.Interfaces
{
    public interface IRoleRepository
    {
        public RoleDto Get(int roleID);
        public IEnumerable<RoleDto> Get();
    }
}
