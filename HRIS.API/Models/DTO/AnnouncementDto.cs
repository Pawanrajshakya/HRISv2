﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRIS.API
{
    public class AnnouncementListDto
    {
        public int Total { get; set; }
        public long RowNum { get; set; }
        public int ID { get; set; }
        public string Title { get; set; }
        public bool DurationRestricted { get; set; }
        public string DisplayAfter { get; set; }
        public string DisplayUntil { get; set; }
        public int Priority { get; set; }
        public bool EmailSent { get; set; }
        public string CreatedBy { get; set; }
        public string DateCreated { get; set; }
        public string DateUpdated { get; set; }
        public string UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsVisible { get; set; }
        public string Status { get; set; }

    }

    public class AnnouncementDto
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImageURL { get; set; }
        public string Link { get; set; }
        public bool DurationRestricted { get; set; }
        public string DisplayAfter { get; set; }
        public string DisplayUntil { get; set; }
        public int Priority { get; set; }
        public bool EmailSent { get; set; }
        public string CreatedBy { get; set; }
        public string DateCreated { get; set; }
        public string UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsVisible { get; set; }
        public string[] Roles { get; set; }
    }
    public class AnnouncementSummaryDto
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImageURL { get; set; }
        public string Link { get; set; }
        public string CreatedBy { get; set; }
        public string DateCreated { get; set; }
        public string UpdatedBy { get; set; }
        public string DateUpdated { get; set; }
    }
}
