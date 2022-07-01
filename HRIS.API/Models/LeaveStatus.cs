namespace HRIS.API
{
    public class LeaveStatus
    {
        [System.ComponentModel.DataAnnotations.Key]
        public string LvStatus { get; set; }
        public string LvStatusDesc { get; set; }
    }
}
