export interface IOvertimeReport {
  rowNum?: number;
  total?: number;
  ein?: string;
  fName?: string;
  lName?: string;
  preferredFirstName?: string;
  preferredLastName?: string;
  rarc?: string;
  title?: string;
  dpCode?: string;
  salary?: number;
  adComp?: number;
  oT_YTDAmt?: number;
  oT_YTDHrs?: string;
  compYTD?: string;
  waiverPrcnt?: string;
  otPercentofBaseSalary?: number;
  otPcntRemaining?: number;
  otPcntRemainingNew?: number;
  showPreferredColumns?: number;
}

export interface IOvertimeEarnedAnalysisReport {
  rowNum?: number;
  total?: number;
  rarc?: string;
  description?: string;
  jul?: number;
  aug?: number;
  sep?: number;
  oct?: number;
  nov?: number;
  dec?: number;
  jan?: number;
  feb?: number;
  mar?: number;
  apr?: number;
  may?: number;
  jun?: number;
  monthly_Alloc?: number;
  fY_Alloc?: number;
  fytD_Earned?: number;
  fytD_Bal?: number;
  project_Earned?: number;
  project_Percent?: number;
  project_Diff?: number;
}


