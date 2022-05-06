namespace HRIS.API
{
    public abstract class Repository
    {
        protected readonly HRISDataContext _context;
        protected readonly AutoMapper.IMapper _mapper;

        public Repository(HRISDataContext context
            , AutoMapper.IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }
    }
}
