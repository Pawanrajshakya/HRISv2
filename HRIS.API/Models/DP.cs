﻿using System.ComponentModel.DataAnnotations;

namespace HRIS.API
{
    public class DP
    {
        [Key]
        public string DPCode { get; set; }
        public string DPName { get; set; }
        public string RCCode { get; set; }
    }
}
