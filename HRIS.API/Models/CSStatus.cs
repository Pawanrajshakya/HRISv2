namespace HRIS.API
{
    public class CSStatusDto
    {
        public string Code { get; set; }
        public string Description { get; set; }
    }
    public class CSStatus
    {
        [System.ComponentModel.DataAnnotations.Key]
        public string Code { get; set; }
        public string Description { get; set; }
    }
}
