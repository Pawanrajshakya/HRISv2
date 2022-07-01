using AutoMapper.QueryableExtensions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface ILeaveStatusRepository
    {
        public Task<List<LeaveStatusDto>> GetAsync(string options = "");
    }

    public class LeaveStatusRepository: Repository, ILeaveStatusRepository
    {
        public LeaveStatusRepository(HRISDataContext context, AutoMapper.IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<LeaveStatusDto>> GetAsync(string options = "")
        {
            var param = new SqlParameter("@Option", options);
            var data = _context.LeaveStatuses.FromSqlRaw("spGetLvStatus @Option", param)
                .ProjectTo<LeaveStatusDto>(_mapper.ConfigurationProvider)
                .ToList();

            return await Task.Run(() => data);
        }
    }
}
