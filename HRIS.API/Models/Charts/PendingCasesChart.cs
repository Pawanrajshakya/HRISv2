﻿using System.ComponentModel.DataAnnotations;

namespace HRIS.API
{
    public class PendingCasesChart
    {
        [Key]
        public int Order { get; set; }
        public string GroupDescription { get; set; }
        public int Count { get; set; }
    }
}
