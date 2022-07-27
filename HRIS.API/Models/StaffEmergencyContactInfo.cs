namespace HRIS.API
{
    public class StaffEmergencyContactInfoDto
    {
        public string Name { get; set; }
        public string Relationship { get; set; }
        public string PrimaryPhone { get; set; }
        public string SecondaryPhone { get; set; }
    }

    public class StaffEmergencyContactInfo
    {
        [System.ComponentModel.DataAnnotations.Key]
        public string Name { get; set; }
        public string Relationship { get; set; }
        public string PrimaryPhone { get; set; }
        public string SecondaryPhone { get; set; }
    }
}
