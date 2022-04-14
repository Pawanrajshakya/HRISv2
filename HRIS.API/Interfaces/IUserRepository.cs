using System.Collections.Generic;

namespace HRIS.API
{
    public interface IUserRepository
    {
        public UserDto Get(string userId);
        public UserDto GetByLanID(string lanID);
        public IEnumerable<UserDto> Get();
        public IEnumerable<UserDto> Get(int roleID, int groupID);
        public IEnumerable<UserListDto> Get(ReportParameters _reportParameters);
        public IEnumerable<SearchUser> Search(string searchBy, bool isSuper);
    }
}
