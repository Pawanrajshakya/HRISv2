namespace HRIS.API
{
    public abstract class Repository
    {
        protected HRISDataContext _context;
        protected GDSDataContext _gdsContext;
        protected AutoMapper.IMapper _mapper;
    }
}
