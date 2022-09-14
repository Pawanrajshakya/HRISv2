export enum Reports {
  SearchStaffReport,
  UsersReport,
  StaffDetails,
  LeaveReport,
  CeasedReport,
  EmergencyContactInfoReport,
  VacationRosterReport,
  PARReport,
  OvertimeReport,
  OvertimeEarnedAnalysisReport,
  CitytimeOTReportByMonth,
  HeadCountReport,
  HeadCountTitleSummaryReport,
  HeadcountTitleAndBudgetSummaryReconciliationReportByRCAndTitle,
  HeadcountTitleAndBudgetSummaryReportByRCAndTitle,
  PMSEmployeeDetailReport,
  EEOSummaryReport,
  EEOConfirmedReportByRA,
  EEOPendingReportByRA,
  ECardsSentByRCReport,
  ECardsReceivedByRCReport,
  ECardsSentByRelationshipOfSenderReport,
  ECardsReceivedByRelationshipOfSenderReport,
  ECardsSentByExcellenceProgramReport,
  ECardsReceivedByExcellenceProgramReport,
  MyStaffsContactInfoReport,
  MyStaffsContactInfoReportNonAdmin,
  ContactInformationReport
}

// export enum RDLParameters {
//   reportName,
//   userID,
//   ein,
//   file_format,
//   pagination_pageNumber,
//   pagination_pageSize,
//   pagination_sortColumn,
//   pagination_sortOrder,
//   pagination_searchTerm,
//   rcDp_isAgencyWise,
//   rcDp_rcs,
//   rcDp_dps,
//   code_backupTitles,
//   code_locations,
//   code_cSStatuses,
//   code_titles,
//   code_lvStatuses,
//   dateFrom,
//   dateTo,
//   openClose,
//   isCalendarYear,
//   year,
//   isDateEarned,
//   minDate,
//   maxDate,
// }

// export interface IHRISReport {
//   name: string;
//   rdlParameters: RDLParameters[];
// }

// export interface IHRISReports {
//   reports: IHRISReport[];
// }

// export class HRISReports {
//   reports: IHRISReport[] = [];

//   constructor() {
//     this.reports = [
//       {
//         name: 'SearchStaffReport',
//         rdlParameters: [RDLParameters.reportName, RDLParameters.file_format, RDLParameters.pagination_sortColumn, RDLParameters.pagination_sortOrder, RDLParameters.pagination_searchTerm, RDLParameters.rcDp_rcs, RDLParameters.rcDp_dps, RDLParameters.code_locations, ], 
//       },
//     ];
//   }
// }
