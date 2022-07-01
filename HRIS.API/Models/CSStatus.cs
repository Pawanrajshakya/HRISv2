namespace HRIS.API
{
    public class CSStatus
    {
        [System.ComponentModel.DataAnnotations.Key]
        public string Code { get; set; }
        public string Description { get; set; }
    }
}
