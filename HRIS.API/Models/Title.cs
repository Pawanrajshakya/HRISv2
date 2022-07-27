namespace HRIS.API
{
    public class TitleDto
    {
        public string Code { get; set; }
        public string Description { get; set; }
        public string RCs { get; set; }
    }

    public class Title
    {
        [System.ComponentModel.DataAnnotations.Key]
        public string Code { get; set; }
        public string Description { get; set; }
        public string RCs { get; set; }
    }
}
