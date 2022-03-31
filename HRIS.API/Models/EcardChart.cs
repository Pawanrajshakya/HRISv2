
using System;
using System.ComponentModel.DataAnnotations;

namespace HRIS.API
{
    public class EcardChart
    {
        [Key]
        public string Created { get; set; }
        public int Data { get; set; }
        public DateTime Date { get; set; }
    }
}
