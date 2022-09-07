using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public interface IAnnouncementRepository
    {
        public IEnumerable<AnnouncementListDto> GetList(string userID, Pagination _reportParameters);
        public Task<IEnumerable<AnnouncementSummaryDto>> GetAsync(string userID);
        public IEnumerable<AnnouncementDto> Get(string userID, int ID);
        public bool Add(AnnouncementDto announcement);
        public bool Update(AnnouncementDto announcement);
        public bool Delete(string userID, int ID);
        public bool UpdatePriority(string userID, int ID, int Priority);
    }

    public class AnnouncementRepository : Repository, IAnnouncementRepository
    {
        public AnnouncementRepository(HRISDataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public bool Add(AnnouncementDto announcement)
        {
            SqlParameter[] sqlParameters = new SqlParameter[] {
                                new SqlParameter("@result", System.Data.SqlDbType.Int){Direction = System.Data.ParameterDirection.Output},
                                new SqlParameter("@Title", announcement.Title),
                                new SqlParameter("@Content", announcement.Content),
                                new SqlParameter("@ImageURL", announcement.ImageURL),
                                new SqlParameter("@Link", announcement.Link ?? ""),
                                new SqlParameter("@DurationRestricted", announcement.DurationRestricted),
                                new SqlParameter("@DisplayAfter", announcement.DisplayAfter),
                                new SqlParameter("@DisplayUntil", announcement.DisplayUntil),
                                new SqlParameter("@Priority", announcement.Priority),
                                new SqlParameter("@EmailSent", announcement.EmailSent),
                                new SqlParameter("@CreatedBy", announcement.CreatedBy),
                                new SqlParameter("@Roles", string.Join(",", announcement.Roles)),
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
                                new SqlParameter("@ID", ID),
                                new SqlParameter("@UpdatedBy", userID){}
            };

            _context.Database.ExecuteSqlRaw($"EXECUTE @result =  dbo.spDeleteAnnouncement " +
                $"@ID, @UpdatedBy", sqlParameters);

            return (int)sqlParameters[0].Value >= 0;
        }

        public async Task<IEnumerable<AnnouncementSummaryDto>> GetAsync(string userID)
        {
            List<AnnouncementSummaryDto> dto = new List<AnnouncementSummaryDto>();

            var sqlParameters = new SqlParameter[] {
                new SqlParameter(){ParameterName= "@UserID", Value= userID}
            };

            var rows = _context.AnnouncementSummary
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

            var rows = _context.Announcement
                .FromSqlRaw($"EXECUTE dbo.spGetAnnouncementByID @UserID, @ID", sqlParameters)
                .ToList();

            foreach (var row in rows)
            {
                var announcement = _mapper.Map<AnnouncementDto>(row);

                if (row.Roles != null)
                {
                    foreach (var item in row.Roles)
                    {
                        int.TryParse(item.ToString(), out int i);
                        if (i > 0) announcement.Roles.Add(i);
                    }
                }

                if (!announcement.DurationRestricted)
                {
                    announcement.DisplayAfter = "";
                    announcement.DisplayUntil = "";
                }

                dto.Add(announcement);
            }
            return dto;
        }

        public IEnumerable<AnnouncementListDto> GetList(string userID, Pagination _reportParameters)
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
                                new SqlParameter("@ID", announcement.ID),
                                new SqlParameter("@Title", announcement.Title),
                                new SqlParameter("@Content", announcement.Content),
                                new SqlParameter("@ImageURL", announcement.ImageURL),
                                new SqlParameter("@Link", announcement.Link ?? ""),
                                new SqlParameter("@DurationRestricted", announcement.DurationRestricted),
                                new SqlParameter("@DisplayAfter", announcement.DisplayAfter),
                                new SqlParameter("@DisplayUntil", announcement.DisplayUntil),
                                new SqlParameter("@Priority", announcement.Priority),
                                new SqlParameter("@EmailSent", announcement.EmailSent),
                                new SqlParameter("@UpdatedBy", announcement.UpdatedBy),
                                new SqlParameter("@Roles", string.Join(",", announcement.Roles.ToArray())),
                                new SqlParameter("@IsVisible", announcement.IsVisible){}
            };

            _context.Database.ExecuteSqlRaw($"EXECUTE @result = dbo.spUpdateAnnouncement " +
                $"@ID, @Title, @Content, @ImageURL, @Link, @DurationRestricted, @DisplayAfter, " +
                $"@DisplayUntil, @Priority, @EmailSent, @UpdatedBy, @Roles, @IsVisible",
                sqlParameters);

            return (int)sqlParameters[0].Value >= 0;
        }

        public bool UpdatePriority(string userID, int ID, int Priority)
        {
            SqlParameter[] sqlParameters = new SqlParameter[] {
                                new SqlParameter("@result", System.Data.SqlDbType.Int){Direction = System.Data.ParameterDirection.Output},
                                new SqlParameter("@ID", ID),
                                new SqlParameter("@Priority", Priority),
                                new SqlParameter("@UpdatedBy", userID){}
            };

            _context.Database.ExecuteSqlRaw($"EXECUTE @result = dbo.spUpdateAnnouncementPriority " +
                $"@ID, @Priority, @UpdatedBy", sqlParameters);

            return (int)sqlParameters[0].Value >= 0;
        }
    }
}
