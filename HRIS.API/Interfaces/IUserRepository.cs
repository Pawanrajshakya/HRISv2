using HRIS.API.Models;
using HRIS.API.Models.DTO;
using System.Collections.Generic;

namespace HRIS.API.Interfaces
{
    public interface IUserRepository
    {
        public UserDto Get(string userId);
        public UserDto GetByLanID(string lanID);
        public IEnumerable<UserDto> Get();
        public IEnumerable<UserDto> Get(int roleID, int groupID);
        public IEnumerable<UserListDto> Get(ReportParameters _reportParameters);
    }
}
