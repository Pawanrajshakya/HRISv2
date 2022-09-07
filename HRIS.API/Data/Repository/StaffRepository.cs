using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IStaffRepository
    {
        public Task<StaffDetailDto> GetStaffDetailAsync(string userid, string ein); //spGetStaffByEIN

        public Task<IEnumerable<StaffEmergencyContactInfoDto>> GetEmergencyContactsAsync(string userid, string ein); //spGetStaffEmergencyContactsByEIN
    }

    public class StaffRepository : Repository, IStaffRepository
    {
        public StaffRepository(HRISDataContext context, AutoMapper.IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<StaffEmergencyContactInfoDto>> GetEmergencyContactsAsync(string userid, string ein)
        {
            List<StaffEmergencyContactInfoDto> dtos = new List<StaffEmergencyContactInfoDto>();

            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@UserID", userid),
                new SqlParameter("@EIN", ein)
            };

            var rows = _context.EmergencyContactInfos
                .FromSqlRaw($"EXECUTE dbo.[spGetStaffEmergencyContactsByEIN] @UserID, @EIN", sqlParameters)
                .ToList();

            foreach (var row in rows)
            {
                dtos.Add(_mapper.Map<StaffEmergencyContactInfoDto>(row));
            }
            return await Task.Run(() => dtos);
        }

        public async Task<StaffDetailDto> GetStaffDetailAsync(string userid, string ein)
        {
            List<StaffDetailDto> dtos = new List<StaffDetailDto>();

            SqlParameter[] sqlParameters = new SqlParameter[] {
                new SqlParameter("@UserID", userid),
                new SqlParameter("@EIN", ein)
            };

            var rows = _context.StaffDetails
                .FromSqlRaw($"EXECUTE dbo.[spGetStaffByEIN] @UserID, @EIN", sqlParameters)
                .ToList();

            foreach (var row in rows)
            {
                dtos.Add(_mapper.Map<StaffDetailDto>(row));
            }
            return await Task.Run(() => dtos.SingleOrDefault(x => x.EIN == ein));
        }
    }
}
