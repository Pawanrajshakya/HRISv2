using System.Collections.Generic;

namespace HRIS.API
{
    public enum _Group
    {
        Admin = 1,
        TEAMS = 2,
        Overtime = 3,
        PAR = 4,
        Headcount = 5,
        EEO = 6,
        ECards = 7,
        PEAS = 8,
        CustSvcComplaints = 9,
        //RetireResignFMLA = 10,
        AgencySeparation = 10,
        VacationRosters = 11,
        //Seniority = 11
    }

    public class Group
    {
        public int GroupID { get; set; }
        public string GroupDescription { get; set; }
        public IList<UserGroup> UsersGroups { get; set; }

    }
}
