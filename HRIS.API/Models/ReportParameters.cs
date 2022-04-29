using System.Collections.Generic;
using System.Linq;

namespace HRIS.API
{
    public class Detail
    {
        private string format;

        public string ReportName { get; set; }
        public string Format
        {
            get
            {
                return format;
            }
            set
            {
                if (value.ToUpper() == "EXCEL")
                {
                    format = "Excel";
                    ContentType = "application/excel";
                }

                if (value.ToUpper() == "PDF")
                {
                    format = "Pdf";
                    ContentType = "application/pdf";
                }

                format = value;
            }
        }
        public string ContentType { get; private set; }
        public string UserID { get; set; }

    }

    public class Pagination
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

    public class RcDp
    {
        private readonly IRCRepository _rCRepository;
        private readonly IDPRepository _dPRepository;

        public RcDp(IRCRepository rCRepository, IDPRepository dPRepository)
        {
            _rCRepository = rCRepository;
            _dPRepository = dPRepository;
        }

        public RcDp()
        {

        }

        public bool IsAgencyWise { get; set; }

        public List<string> RCList { get; set; }
        public List<string> DPList { get; set; }

        public string RC
        {
            get
            {
                if (RCList != null && RCList.Count != 0)
                    return Utility.ConvertToString(RCList);

                if (!IsAgencyWise)
                {
                    return Utility.ConvertToString(
                        _rCRepository.Get(UserSession.Instance.User.UserID)
                        .Select(s => s.Code)
                        .ToList()
                        );
                }
                return null;
            }
        }

        public string DP
        {
            get
            {
                if (DPList != null && DPList.Count != 0)
                    return Utility.ConvertToString(DPList);

                if (!IsAgencyWise)
                {
                    return Utility.ConvertToString(
                        _dPRepository.Get()
                        .Select(s => s.DPCode)
                        .ToList()
                        );
                }

                return null;
            }
        }
    }

    public class Code
    {
        public string BackupTitles { get; set; }
        public string Locations { get; set; }
        public string CSStatus { get; set; }
        public string Titles { get; set; }
    }

    public class ReportParameters
    {
        public Detail Detail { get; set; }
        public Pagination Pagination { get; set; }
        public RcDp RcDp { get; set; }
        public Code Code { get; set; }
    }

    public class TableViewParameters
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