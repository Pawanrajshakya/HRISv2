namespace HRIS.API
{
    public class ReportParameters
    {
        private int _PageNumber;
        private int _PageSize;
        public virtual int PageNumber
        {
            get { return _PageNumber; }
            set
            {
                _PageNumber = (value == 0) ? 1 : value;
            }
        }
        public virtual int PageSize
        {
            get { return _PageSize; }
            set
            {
                _PageSize = (value == 0) ? 10 : value;
            }
        }
        public virtual string SortColumn { get; set; }
        public virtual string SortOrder { get; set; }
        public virtual string SearchTerm { get; set; }
    }
}