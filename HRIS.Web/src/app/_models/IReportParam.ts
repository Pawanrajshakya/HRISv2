export interface ITableViewParam {
  pageNumber: number;
  pageSize: number;
  sortColumn?: string;
  sortOrder?: string;
  searchTerm?: string;
}

export interface IReportFormat {
  mimeType: string,
  extension: string
}

export interface IReportParam {
  reportName: string,
  userID?: string,
  ein?: string,
  file: {
    format: string, //IReportFormat;
  },
  pagination: {
    pageNumber?: number;
    pageSize?: number;
    sortColumn?: string;
    sortOrder?: string;
    searchTerm?: string;
  },
  rcDp: {
    isAgencyWise?: boolean,
    rcs?: string,
    dps?: string,
  },
  code: {
    backupTitles?: string;
    locations?: string;
    cSStatus?: string;
    titles?: string
  }
}