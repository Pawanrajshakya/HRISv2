using System.Collections.Generic;

namespace HRIS.API
{
    public interface IRoleRepository
    {
        public RoleDto Get(int roleID);
        public IEnumerable<RoleDto> Get();
    }
}
