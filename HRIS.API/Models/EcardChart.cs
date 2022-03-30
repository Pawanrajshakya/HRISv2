
using System;
using System.ComponentModel.DataAnnotations;

namespace HRIS.API.Models
{
    public class EcardChart
    {
        [Key]
        public string Created { get; set; }
        public int Data { get; set; }
        public DateTime Date { get; set; }
    }
}
