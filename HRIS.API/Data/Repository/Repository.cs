﻿namespace HRIS.API
{
    public abstract class Repository
    {
        protected HRISDataContext _context;
        protected AutoMapper.IMapper _mapper;
    }
}
