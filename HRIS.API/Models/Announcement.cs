﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
        public AnnouncementDto()
        {
            Roles = new List<int>();
        }
        public int ID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        [MaxLength(300, ErrorMessage ="Image Url lenght is too long.")]
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
        public string DateUpdated { get; set; }

        public bool IsActive { get; set; }
        public bool IsVisible { get; set; }
        public List<int> Roles { get; set; }
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

    public class AnnouncementList
    {
        public int Total { get; set; }
        [Key]
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

    public class Announcement
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
        public DateTime? DateCreated { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? DateUpdated { get; set; }
        public bool IsActive { get; set; }
        public bool IsVisible { get; set; }
        public string Roles { get; set; }
    }

    public class AnnouncementSummary
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImageURL { get; set; }
        public string Link { get; set; }
        //public string CreatedBy { get; set; }
        //public string? DateCreated { get; set; }
        //public string UpdatedBy { get; set; }
        //public string? DateUpdated { get; set; }
    }
}
