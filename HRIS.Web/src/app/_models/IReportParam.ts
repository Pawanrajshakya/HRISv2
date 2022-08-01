export interface ITableViewParam {
  pageNumber: number;
  pageSize: number;
  sortColumn?: string;
  sortOrder?: string;
  searchTerm?: string;
}

export interface IReportFormat {
  mimeType: string;
  extension: string;
}

export interface IReportParam {
  reportName: string;
  userID?: string;
  ein?: string;
  file: {
    format: string; //IReportFormat;
  };
  pagination: {
    pageNumber?: number;
    pageSize?: number;
    sortColumn?: string;
    sortOrder?: string;
    searchTerm?: string;
  };
  rcDp: {
    isAgencyWise?: boolean;
    rcs?: string;
    dps?: string;
  };
  code: {
    backupTitles?: string;
    locations?: string;
    cSStatuses?: string;
    titles?: string;
    lvStatuses?: string;
  };
  dateFrom?: string;
  dateTo?: string;
  openClose?: string;
}

export interface IPARParam extends IReportParam {
  dateFrom?: string;
  dateTo?: string;
  openClose?: string; //Open //Closed
}

export interface IAgencySeparationParam extends IReportParam {
  isCalenderYear?: boolean;
  year?: number;
}
