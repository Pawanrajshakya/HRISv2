using System;

namespace HRIS.API
{
    public class StaffEDUDetailDto
    {
        public Int64 RowNo { get; set; }
        public string EIN { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string RCCode { get; set; }
        public string DPCode { get; set; }
        public string LocationName { get; set; }
        public DateTime? DateInfraction { get; set; }
        public string Charges { get; set; }
        public string RequestSourceDescription { get; set; }
        public DateTime? DateReceived { get; set; }
        public string TrackingNo { get; set; }
        public DateTime? ICDate { get; set; }
        public string ICPenalty { get; set; }
        public string CurrentStatus { get; set; }
    }
}
