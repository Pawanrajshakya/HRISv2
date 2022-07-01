using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface ITitleRepository
    {
        public Task<List<TitleDto>> GetAsync(string userId);
        public Task<List<TitleDto>> GetBackupTitleAsync(string userId);
    }

    public class TitleRepository : Repository, ITitleRepository
    {
        public TitleRepository(HRISDataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<TitleDto>> GetAsync(string userid)
        {
            var param = new SqlParameter("@UserID", userid);
            var data = _context.Titles.FromSqlRaw("spGetTitleList @UserID", param)
                .ProjectTo<TitleDto>(_mapper.ConfigurationProvider)
                .ToList();

            return await Task.Run(() => data);
        }

        public async Task<List<TitleDto>> GetBackupTitleAsync(string userid)
        {
            var param = new SqlParameter("@UserID", userid);
            var data = _context.Titles
                .FromSqlRaw("spGetBackupTitleList @UserID", param)
                .ProjectTo<TitleDto>(_mapper.ConfigurationProvider)
                .ToList();

            return await Task.Run(() => data);
        }
    }
}
