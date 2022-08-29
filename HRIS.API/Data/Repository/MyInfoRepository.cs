using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{

    public interface IMyInfoRepository
    {
        Task<MyInfoTreeDto> GetMyInfoTreeAsync(UserDto user);
        Task<List<MyInfoTreeDto>> GetMyInfoTreeAsync(string ein);
    }

    public class MyInfoRepository : Repository, IMyInfoRepository
    {

        public MyInfoRepository(HRISDataContext context, AutoMapper.IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<MyInfoTreeDto> GetMyInfoTreeAsync(UserDto user)
        {
            try
            {
                var dtos = new List<MyInfoTreeDto>();

                SqlParameter[] sqlParameters = new SqlParameter[] { new SqlParameter("@EIN", user.EIN) { } };

                var rows = _context.MyInfoTrees.FromSqlRaw($"EXECUTE dbo.[spGetChainOfCommand] @EIN", sqlParameters).ToList();

                var dto = new MyInfoTreeDto()
                {
                    EIN = user.EIN,
                    Name = user.FirstName + " " + user.LastName,
                    EmployeesCount = rows.Count
                };

                foreach (var row in rows)
                {
                    dto.Children.Add(_mapper.Map<MyInfoTreeDto>(row));
                    //var hasChildren = row.EmployeesCount > 0;
                    //do
                    //{
                    //    var children = _context.MyInfoTrees.FromSqlRaw($"EXECUTE dbo.[spGetChainOfCommand] @EIN", new SqlParameter[] { new SqlParameter("@EIN", row.EIN) { } }).ToList();
                    //    foreach(var child in children)
                    //    {
                    //        var _childDto = _mapper.Map<MyInfoTreeDto>(child);
                    //        hasChildren = _childDto.EmployeesCount > 0;
                    //    }
                    //} while (hasChildren);
                }



                return await Task.Run(() => dto);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<MyInfoTreeDto>> GetMyInfoTreeAsync(string ein)
        {
            try
            {
                var dtos = new List<MyInfoTreeDto>();

                SqlParameter[] sqlParameters = new SqlParameter[] { new SqlParameter("@EIN", ein) { } };

                var rows = _context.MyInfoTrees.FromSqlRaw($"EXECUTE dbo.[spGetChainOfCommand] @EIN", sqlParameters).ToList();

                foreach (var row in rows)
                {
                    dtos.Add(_mapper.Map<MyInfoTreeDto>(row));
                }
                return await Task.Run(() => dtos);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
    }
}
