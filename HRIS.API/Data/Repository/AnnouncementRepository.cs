using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public class AnnouncementRepository : Repository, IAnnouncementRepository
    {
        public AnnouncementRepository(HRISDataContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public bool Add(AnnouncementDto announcement)
        {
            SqlParameter[] sqlParameters = new SqlParameter[] {
                                new SqlParameter("@result", System.Data.SqlDbType.Int){Direction = System.Data.ParameterDirection.Output},
                                new SqlParameter("@Title", announcement.Title){},
                                new SqlParameter("@Content", announcement.Content){},
                                new SqlParameter("@ImageURL", announcement.ImageURL){},
                                new SqlParameter("@Link", announcement.Link){},
                                new SqlParameter("@DurationRestricted", announcement.DurationRestricted){},
                                new SqlParameter("@DisplayAfter", announcement.DisplayAfter){},
                                new SqlParameter("@DisplayUntil", announcement.DisplayUntil){},
                                new SqlParameter("@Priority", announcement.Priority){},
                                new SqlParameter("@EmailSent", announcement.EmailSent){},
                                new SqlParameter("@CreatedBy", announcement.CreatedBy){},
                                new SqlParameter("@Roles", string.Join(",", announcement.Roles)){},
                                new SqlParameter("@IsVisible", announcement.IsVisible){}
            };

            _context.Database.ExecuteSqlRaw($"EXECUTE @result = dbo.spInsertAnnouncement " +
                $"@Title, @Content, @ImageURL, @Link, @DurationRestricted, @DisplayAfter, @DisplayUntil," +
                $"@Priority, @EmailSent, @CreatedBy, @Roles, @IsVisible", sqlParameters);

            return (int)sqlParameters[0].Value >= 0;
        }

        public bool Delete(string userID, int ID)
        {
            SqlParameter[] sqlParameters = new SqlParameter[] {
                                new SqlParameter("@result", System.Data.SqlDbType.Int){Direction = System.Data.ParameterDirection.Output},
                                new SqlParameter("@ID", ID){},
                                new SqlParameter("@UpdatedBy", userID){}
            };

            _context.Database.ExecuteSqlRaw($"EXECUTE @result =  dbo.spDeleteAnnouncement " +
                $"@ID, @UpdatedBy", sqlParameters);

            return (int)sqlParameters[0].Value >= 0;
        }

        public async Task<IEnumerable<AnnouncementSummaryDto>> Get(string userID)
        {
            List<AnnouncementSummaryDto> dto = new List<AnnouncementSummaryDto>();

            var sqlParameters = new SqlParameter[] {
                new SqlParameter(){ParameterName= "@UserID", Value= userID}
            };

            var rows = _context.AnnouncementList
                .FromSqlRaw($"EXECUTE dbo.spGetAnnouncements @UserID", sqlParameters)
                .ToList();

            foreach (var row in rows)
            {
                dto.Add(_mapper.Map<AnnouncementSummaryDto>(row));
            }
            return await Task.Run(() => dto);
        }

        public IEnumerable<AnnouncementDto> Get(string userID, int ID)
        {
            List<AnnouncementDto> dto = new List<AnnouncementDto>();

            var sqlParameters = new SqlParameter[] {
                new SqlParameter(){ParameterName= "@UserID", Value= userID},
                new SqlParameter(){ParameterName= "@ID", Value= ID },
            };

            var rows = _context.AnnouncementList
                .FromSqlRaw($"EXECUTE dbo.spGetAnnouncementByID @UserID, @ID", sqlParameters)
                .ToList();

            foreach (var row in rows)
            {
                dto.Add(_mapper.Map<AnnouncementDto>(row));
            }
            return dto;
        }

        public IEnumerable<AnnouncementListDto> GetList(string userID, TableViewParameters _reportParameters)
        {
            List<AnnouncementListDto> dto = new List<AnnouncementListDto>();

            var sqlParameters = new SqlParameter[] {
                new SqlParameter(){ParameterName= "@UserID", Value= userID},
                new SqlParameter(){ParameterName= "@PageNumber", Value= _reportParameters.PageNumber },
                new SqlParameter(){ParameterName= "@PageSize", Value= _reportParameters.PageSize},
                new SqlParameter(){ParameterName= "@SortColumn", Value= _reportParameters.SortColumn??""},
                new SqlParameter(){ParameterName= "@SortOrder", Value= _reportParameters.SortOrder??""},
                new SqlParameter(){ParameterName= "@SearchTerm", Value= _reportParameters.SearchTerm??""}
            };

            var rows = _context.AnnouncementList
                .FromSqlRaw($"EXECUTE dbo.spGetPagedAnnouncements @UserID, @PageNumber, @PageSize, @SortColumn, @SortOrder, @SearchTerm", sqlParameters)
                .ToList();

            foreach (var row in rows)
            {
                dto.Add(_mapper.Map<AnnouncementListDto>(row));
            }
            return dto;
        }

        public bool Update(AnnouncementDto announcement)
        {
            SqlParameter[] sqlParameters = new SqlParameter[] {
                                new SqlParameter("@result", System.Data.SqlDbType.Int){Direction = System.Data.ParameterDirection.Output},
                                new SqlParameter("@ID", announcement.ID){},
                                new SqlParameter("@Title", announcement.Title){},
                                new SqlParameter("@Content", announcement.Content){},
                                new SqlParameter("@ImageURL", announcement.ImageURL){},
                                new SqlParameter("@Link", announcement.Link){},
                                new SqlParameter("@DurationRestricted", announcement.DurationRestricted){},
                                new SqlParameter("@DisplayAfter", announcement.DisplayAfter){},
                                new SqlParameter("@DisplayUntil", announcement.DisplayUntil){},
                                new SqlParameter("@Priority", announcement.Priority){},
                                new SqlParameter("@EmailSent", announcement.EmailSent){},
                                new SqlParameter("@CreatedBy", announcement.CreatedBy){},
                                new SqlParameter("@Roles", string.Join(",", announcement.Roles)){},
                                new SqlParameter("@IsVisible", announcement.IsVisible){}
            };

            _context.Database.ExecuteSqlRaw($"EXECUTE @result = dbo.spUpdateAnnouncement " +
                $"@Title, @Content, @ImageURL, @Link, @DurationRestricted, @DisplayAfter, " +
                $"@DisplayUntil, @Priority, @EmailSent, @CreatedBy, @Roles, @IsVisible",
                sqlParameters);

            return (int)sqlParameters[0].Value >= 0;
        }

        public bool UpdatePriority(string userID, int ID, int Priority)
        {
            SqlParameter[] sqlParameters = new SqlParameter[] {
                                new SqlParameter("@result", System.Data.SqlDbType.Int){Direction = System.Data.ParameterDirection.Output},
                                new SqlParameter("@ID", ID){},
                                new SqlParameter("@Priority", Priority){},
                                new SqlParameter("@UpdatedBy", userID){}
            };

            _context.Database.ExecuteSqlRaw($"EXECUTE @result = dbo.spUpdateAnnouncementPriority " +
                $"@ID, @Priority, @UpdatedBy", sqlParameters);

            return (int)sqlParameters[0].Value >= 0;
        }
    }
}
