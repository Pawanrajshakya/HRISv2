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
  reportName: string; //1.1
  userID?: string; //2.1
  ein?: string; //3.1
  file: { 
    format: string; //IReportFormat; //4.1
  };
  pagination: {
    pageNumber?: number;  //5.1
    pageSize?: number;  //5.2
    sortColumn?: string;  //5.3
    sortOrder?: string; //5.4
    searchTerm?: string;  //5.5
  };
  rcDp: {
    isAgencyWise?: boolean; //6.1
    rcs?: string; //6.2
    dps?: string; //6.3
  };
  code: {
    backupTitles?: string; //7.1
    locations?: string; //7.
    cSStatuses?: string;  //7.
    titles?: string;  //7.
    lvStatuses?: string;  //7.
  };
  dateFrom?: string; //8.1
  dateTo?: string;  //9.1
  openClose?: string; //10.1
  isCalendarYear?: boolean; //11.1
  year?: string; //12.1
  isDateEarned?: boolean; //13.1
  minDate?: number; //14.1
  maxDate?: number; //15.1
  isSentBy?: Boolean; //16.1
  fields: number[];
}

export interface IPARParam extends IReportParam {
  dateFrom?: string;
  dateTo?: string;
  openClose?: string; //Open //Closed
}
