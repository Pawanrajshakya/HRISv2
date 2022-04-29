using System.Collections.Generic;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IUserRepository
    {
        public UserDto Get(string userId);
        public UserDto GetByLanID(string lanID);
        public IEnumerable<UserDto> Get();
        public IEnumerable<UserDto> Get(int roleID, int groupID);
        public IEnumerable<UserListDto> Get(TableViewParameters _reportParameters);
        public IEnumerable<SearchUser> Search(string searchBy, bool isSuper);
        //public IEnumerable<GetUserByEINDto> GetUserByEIN(string ein, bool isSuper);
        public Task<GetUserByEINDto> GetUserByEINAsync(string ein, bool isSuper);
        public bool Add(UserDtoToAddAndUpdate user);
        public bool Update(UserDtoToAddAndUpdate user);
        public bool Delete(string userID);
        public bool IsDeveloper(string lanID);
    }
}
