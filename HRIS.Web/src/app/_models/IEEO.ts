export interface IEEOChartDto {
  labels?: string;
  data?: number;
  title?: string;
}

export interface IEEOConfirmedReport {
  total?: number;
  rowNum?: number;
  rc?: string;
  rcName?: string;
  dpCode?: string;
  dpName?: string;
  name?: string;
  preferredEmployeeName?: string;
  confirmation?: string;
  confirmedBy?: string;
  confirmedDate?: string;
  supervisorEIN?: string;
  supervisorName?: string;
  preferredSupervisorName?: string;
}

export interface IEEOPendingReport {
  total?: number;
  rowNum?: number;
  ra?: string;
  rc?: string;
  rcName?: string;
  dpCode?: string;
  dpName?: string;
  ein?: string;
  name?: string;
  preferredEmployeeName?: string;
  supervisorEIN?: string;
  supervisorName?: string;
  preferredSupervisorName?: string;
  supervisorEmail?: string;
}

export interface IEEOSummaryReport {
  total?: number;
  rowNum?: number;
  rc?: string;
  rcName?: string;
  activeEmployees?: number;
  countThatHadConfirmation?: number;
  percentConfirmed?: number;
}
