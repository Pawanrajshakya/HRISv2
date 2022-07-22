using System;

namespace HRIS.API
{
    public class StaffEmergencyContactInfoReportDto
    {
        public int Total { get; set; }
        public Int64 RowNum { get; set; }
        public string EIN { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string PreferredFirstName { get; set; }
        public string PreferredLastName { get; set; }
        public string PersonalEmail { get; set; }
        public string RCCode { get; set; }
        public string DPCode { get; set; }
        public string WorkAddress { get; set; }
        public string HomeAddress { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string HomePhone { get; set; }
        public string EmergencyContactName { get; set; }
        public string Relationship { get; set; }
        public string PrimaryPhone { get; set; }
        public int NoOfEContact { get; set; }
    }

    public class StaffEmergencyContactInfoReport
    {
        public int Total { get; set; }
        [System.ComponentModel.DataAnnotations.Key]
        public Int64 RowNum { get; set; }
        public string EIN { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string PreferredFirstName { get; set; }
        public string PreferredLastName { get; set; }
        public string PersonalEmail { get; set; }
        public string RCCode { get; set; }
        public string DPCode { get; set; }
        public string WorkAddress { get; set; }
        public string HomeAddress { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string HomePhone { get; set; }
        public string EmergencyContactName { get; set; }
        public string Relationship { get; set; }
        public string PrimaryPhone { get; set; }
        public int NoOfEContact { get; set; }
    }
}
