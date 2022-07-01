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
  detail: {
    reportName: string;
    format: string, //IReportFormat;
    userID?: string;
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
    rCList?: string[],
    dPList?: string[],
  },
  code: {
    backupTitles?: string;
    locations?: string;
    cSStatus?: string;
    titles?: string
  }
}