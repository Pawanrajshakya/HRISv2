using System;

namespace HRIS.API
{
    public class File
    {
        private string _format;
        public string RDLFileName { get; set; }
        public string Format
        {
            get
            {
                return _format;
            }
            set
            {
                if (value.ToUpper() == "EXCEL")
                {
                    _format = "Excel";
                    ContentType = "application/excel";
                }

                if (value.ToUpper() == "EXCELOPENXML")
                {
                    _format = "ExcelOpenXml";
                    ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                }

                if (value.ToUpper() == "PDF")
                {
                    _format = "Pdf";
                    ContentType = "application/pdf";
                }

                _format = value;
            }
        }
        public string ContentType { get; private set; }
    }

    public class Pagination
    {
        private int _PageNumber;
        private int _PageSize;
        private string sortColumn = string.Empty;
        private string sortOrder = string.Empty;
        private string searchTerm = string.Empty;

        public virtual int PageNumber { get => _PageNumber; set => _PageNumber = (value == 0) ? 1 : value; }
        public virtual int PageSize { get => _PageSize; set => _PageSize = (value == 0) ? 10 : value; }
        public virtual string SortColumn { get => sortColumn; set => sortColumn = value ?? string.Empty; }
        public virtual string SortOrder { get => sortOrder; set => sortOrder = value ?? string.Empty; }
        public virtual string SearchTerm { get => searchTerm; set => searchTerm = value ?? string.Empty; }
    }

    public class RcDp
    {
        public bool IsAgencyWise { get; set; }
        public string RCs { get; set; }
        public string DPs { get; set; }
    }

    public class Code
    {
        private string backupTitles = string.Empty;
        private string locations = string.Empty;
        private string cSStatuses = string.Empty;
        private string titles = string.Empty;
        private string lvStatuses = string.Empty;

        public string BackupTitles { get => backupTitles; set => backupTitles = value ?? string.Empty; }
        public string Locations { get => locations; set => locations = string.IsNullOrEmpty(value) ? string.Empty : value; }
        public string CSStatuses { get => cSStatuses; set => cSStatuses = value ?? string.Empty; }
        public string Titles { get => titles; set => titles = value ?? string.Empty; }
        public string LvStatuses { get => lvStatuses; set => lvStatuses = value; }

    }

    public class ReportParameters
    {
        public string UserID { get; set; }
        public string ReportName { get; set; }
        public File File { get; set; }
        public Pagination Pagination { get; set; }
        public RcDp RcDp { get; set; }
        public Code Code { get; set; }
        public string Ein { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public string OpenClose { get; set; }
    }

    public class AgencySeparationParameters : ReportParameters
    {
        public bool IsCalendarYear { get; set; } = true;
        public int Year { get; set; }
    }

    public class OvertimeParameters : AgencySeparationParameters
    {
        public bool IsDateEarned { get; set; }
        public int MinDate { get; set; }
        public int MaxDate { get; set; }
    }

}