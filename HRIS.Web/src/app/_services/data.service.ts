import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ITopInfractionsChart } from '../_models/ITopInfractionsChart';
import { ICasesCountByYear } from '../_models/ICasesCountByYear';
import { IPendingCasesChart } from '../_models/IPendingCasesChart';
import { ErrorHandlingService } from './error-handling.service';
import { BaseService } from './_base.service';
import { IPARDetail, IPARReport } from '../_models/IPARReport';
import { IPARParam, IReportParam } from '../_models/IReportParam';
import { IBudgetedOT } from '../_models/IBudgetedOT';
import {
  IOvertimeEarnedAnalysisReport,
  IOvertimeReport,
} from '../_models/IOvertimeReport';
import { IOvertimeCitytimeReport } from '../_models/IOvertimeCitytimeReport';

import { IHeadcountChartData } from '../_models/IHeadcountChartData';
import {
  IHeadcountPMSEmployeeDetailReport,
  IHeadcountReport,
  IHeadcountTitleAndBudgetReconciliationSummaryReport,
  IHeadcountTitleAndBudgetSummaryReport,
  IHeadCountTitleSummaryReport,
} from '../_models/IHeadcountReport';
import { IAgencySeparationChart } from '../_models/IAgencySeparationChart';
import { IAgencySeparationSummary } from '../_models/IAgencySeparationSummary';
import { IVacationRoasterReport } from '../_models/IVacationRoasterReport';
import { IStaffEmergencyContactInfoReport } from '../_models/IStaffEmergencyContactInfoReport';
import { IStaffLeaveReport } from '../_models/IStaffLeaveReport';
import { IActiveStaffReport } from '../_models/IActiveStaffReport';
import {
  IEEOChartDto,
  IEEOConfirmedReport,
  IEEOPendingReport,
  IEEOSummaryReport,
} from '../_models/IEEO';
import {
  IECardByExcellenceReport,
  IECardByRelationshipReport,
  IECardChart,
  IECardSendAndReceivedReport,
} from '../_models/IECard';
import {
  IEmployeeBehaviorChart,
  IEmployeeBehaviorParameters,
} from '../_models/IEmployeeBehavior';

@Injectable({
  providedIn: 'root',
})
export class DataService extends BaseService {
  constructor(
    private httpClient: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) {
    super();
  }

  //#region  Teams

  pendingCasesChart$ = this.httpClient
    .get<IPendingCasesChart[]>(this.url + 'Team/PendingCasesChartAsync')
    .pipe(
      // tap((data) =>
      //   console.log('PendingCasesChartAsync >> ', JSON.stringify(data))
      // ),
      catchError((err) => this.errorHandlingService.handleError(err)) //error handling
    );

  casesCountByYearChart$ = this.httpClient
    .get<ICasesCountByYear[]>(this.url + 'Team/CaseCountByYearChartAsync')
    .pipe(
      // tap((data) =>
      //   console.log('CaseCountByYearChartAsync >> ', JSON.stringify(data))
      // ),
      catchError((err) => this.errorHandlingService.handleError(err)) //error handling
    );

  topInfractionsChart$ = this.httpClient
    .get<ITopInfractionsChart[]>(this.url + 'Team/TopInfractionsChartAsync')
    .pipe(
      // tap((data) =>
      //   console.log('TopInfractionsChartAsync >> ', JSON.stringify(data))
      // ),
      catchError((err) => this.errorHandlingService.handleError(err)) //error handling
    );

  //#endregion

  //#region  PAR
  parReport$(tableViewParam?: IPARParam): Observable<IPARReport[] | null> {
    return this.httpClient
      .post<IPARReport[]>(this.url + 'par/report', tableViewParam)
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  parDetail$(reqNumber: string): Observable<IPARDetail[] | null> {
    return this.httpClient
      .get<IPARDetail[]>(this.url + 'par/detail/' + reqNumber)
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }
  //#endregion

  //#region  OVERTIME

  budgetedOTChart$(rcs: string, year: string) {
    if (!rcs || rcs.length === 0) rcs = '*';

    return this.httpClient
      .get<IBudgetedOT[]>(
        this.url + 'overtime/budgetedOT/' + rcs + '/' + year ?? 'P'
      )
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  actualOTChart$(rcs: string) {
    if (!rcs || rcs.length === 0) rcs = '*';

    return this.httpClient
      .get<IBudgetedOT[]>(this.url + 'overtime/actualOT/' + rcs ?? '')
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  overtimeReport$(
    tableViewParam?: IReportParam
  ): Observable<IOvertimeReport[] | null> {
    return this.httpClient
      .post<IOvertimeReport[]>(
        this.url + 'overtime/overtimeReport',
        tableViewParam
      )
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  overtimeEarnedAnalysisReport$(
    tableViewParam?: IReportParam
  ): Observable<IOvertimeEarnedAnalysisReport[] | null> {
    return this.httpClient
      .post<IOvertimeEarnedAnalysisReport[]>(
        this.url + 'overtime/overtimeEarnedAnalysisReport',
        tableViewParam
      )
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  overtimeCitytimeReport$(
    tableViewParam?: IReportParam
  ): Observable<IOvertimeCitytimeReport[] | null> {
    return this.httpClient
      .post<IOvertimeCitytimeReport[]>(
        this.url + 'hrisReport/overtimeCitytimeReport',
        tableViewParam
      )
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }
  //#endregion

  //#region  EEO

  eeoGenderChart$ = this.httpClient
    .post<IEEOChartDto[]>(this.url + 'gds/EEOGenderChart', null)
    .pipe(
      catchError((err) => this.errorHandlingService.handleError(err)) //error handling
    );

  eeoAgencyDemographicChart$ = this.httpClient
    .post<IEEOChartDto[]>(this.url + 'gds/EEOAgencyDemographicChart', null)
    .pipe(
      catchError((err) => this.errorHandlingService.handleError(err)) //error handling
    );

  eeoConfirmedReport$(reportParam: IReportParam) {
    return this.httpClient
      .post<IEEOConfirmedReport[]>(
        this.url + 'gds/EEOConfirmedReport',
        reportParam
      )
      .pipe(
        //tap((data) => console.log('Headcount/chart >> ', JSON.stringify(data))),
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }

  eeoPendingReport$(reportParam: IReportParam) {
    return this.httpClient
      .post<IEEOPendingReport[]>(this.url + 'gds/EEOPendingReport', reportParam)
      .pipe(
        //tap((data) => console.log('Headcount/chart >> ', JSON.stringify(data))),
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }

  eeoSummaryReport$(reportParam: IReportParam) {
    return this.httpClient
      .post<IEEOSummaryReport[]>(this.url + 'gds/EEOSummaryReport', reportParam)
      .pipe(
        //tap((data) => console.log('Headcount/chart >> ', JSON.stringify(data))),
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }
  //#endregion

  //#region  Headcount

  headcountChart$ = this.httpClient
    .get<IHeadcountChartData[]>(this.url + 'Headcount/chart')
    .pipe(
      catchError((err) => this.errorHandlingService.handleError(err)) //error handling
    );

  chart$(reportParam: IReportParam) {
    return this.httpClient
      .post<IHeadcountChartData[]>(this.url + 'Headcount/chart', reportParam)
      .pipe(
        //tap((data) => console.log('Headcount/chart >> ', JSON.stringify(data))),
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }

  report$(reportParam: IReportParam) {
    return this.httpClient
      .post<IHeadcountReport[]>(this.url + 'Headcount/report', reportParam)
      .pipe(
        //tap((data) => console.log('Headcount/report >> ', JSON.stringify(data))),
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }

  titleSummaryReport$(reportParam: IReportParam) {
    return this.httpClient
      .post<IHeadCountTitleSummaryReport[]>(
        this.url + 'Headcount/titleSummaryReport',
        reportParam
      )
      .pipe(
        //tap((data) => console.log('Headcount/report >> ', JSON.stringify(data))),
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }

  titleAndBudgetReconciliationSummary$(reportParam: IReportParam) {
    return this.httpClient
      .post<IHeadcountTitleAndBudgetReconciliationSummaryReport[]>(
        this.url + 'Headcount/titleAndBudgetReconciliationSummary',
        reportParam
      )
      .pipe(
        //tap((data) => console.log('Headcount/report >> ', JSON.stringify(data))),
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }

  titleAndBudgetSummary$(reportParam: IReportParam) {
    return this.httpClient
      .post<IHeadcountTitleAndBudgetSummaryReport[]>(
        this.url + 'Headcount/titleAndBudgetSummary',
        reportParam
      )
      .pipe(
        //tap((data) => console.log('Headcount/report >> ', JSON.stringify(data))),
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }

  pmsEmployeeDetail$(reportParam: IReportParam) {
    return this.httpClient
      .post<IHeadcountPMSEmployeeDetailReport[]>(
        this.url + 'Headcount/pmsEmployeeDetail',
        reportParam
      )
      .pipe(
        //tap((data) => console.log('Headcount/report >> ', JSON.stringify(data))),
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }
  //#endregion

  //#region AgencySeparation
  agencySeparationChart$(tableViewParam?: IReportParam) {
    return this.httpClient
      .post<IAgencySeparationChart[]>(
        this.url + 'agencySeparation/chart',
        tableViewParam
      )
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  agencySeparation$(tableViewParam?: IReportParam) {
    return this.httpClient
      .post<IAgencySeparationSummary[]>(
        this.url + 'agencySeparation/summary',
        tableViewParam
      )
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }
  //#endregion

  //#region  Staff
  activeStaffReport$(tableViewParam?: IReportParam) {
    return this.httpClient
      .post<IActiveStaffReport[]>(
        this.url + 'hrisReport/activeStaffReport',
        tableViewParam
      )
      .pipe(
        //tap((data) => { console.log(data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  leaveReport$(tableViewParam?: IReportParam) {
    return this.httpClient
      .post<IStaffLeaveReport[]>(
        this.url + 'hrisReport/leaveReport',
        tableViewParam
      )
      .pipe(
        //tap((data) => { console.log(data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  ceasedReport$(tableViewParam?: IReportParam) {
    return this.httpClient
      .post<IStaffLeaveReport[]>(
        this.url + 'hrisReport/ceasedReport',
        tableViewParam
      )
      .pipe(
        //tap((data) => { console.log(data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  emergencyContactInfoReport$(tableViewParam?: IReportParam) {
    return this.httpClient
      .post<IStaffEmergencyContactInfoReport[]>(
        this.url + 'hrisReport/emergencyContactInfoReport',
        tableViewParam
      )
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  vacationRoasterReport$(tableViewParam?: IReportParam) {
    return this.httpClient
      .post<IVacationRoasterReport[]>(
        this.url + 'hrisReport/vactionRoasterReport',
        tableViewParam
      )
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  
  //#endregion

  //#region ECard

  eCards$ = this.httpClient
    .post<IECardChart[]>(this.url + 'gds/ECardChart', null)
    .pipe(
      catchError((err) => this.errorHandlingService.handleError(err)) //error handling
    );

  ECardChartByRC$(tableViewParam?: IReportParam) {
    return this.httpClient
      .post<IECardChart[]>(this.url + 'gds/ECardChartByRC', tableViewParam)
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  ECardSendAndReceivedReport$(tableViewParam?: IReportParam) {
    return this.httpClient
      .post<IECardSendAndReceivedReport[]>(
        this.url + 'gds/ECardSendAndReceivedReport',
        tableViewParam
      )
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  GetECardByRelationshipReport$(tableViewParam?: IReportParam) {
    return this.httpClient
      .post<IECardByRelationshipReport[]>(
        this.url + 'gds/ECardByRelationshipReport',
        tableViewParam
      )
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  GetECardByExcellenceReport$(tableViewParam?: IReportParam) {
    return this.httpClient
      .post<IECardByExcellenceReport[]>(
        this.url + 'gds/GetECardByExcellenceReport',
        tableViewParam
      )
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  //#endregion

  //#region  Disciplinary
  GetPendingCasesChart$(rc: string) {
    return this.httpClient
      .get<IPendingCasesChart[]>(
        this.url + 'Team/PendingCasesChartAsync/' + rc ?? ''
      )
      .pipe(
        // tap((data) =>
        //   console.log('PendingCasesChartAsync >> ', JSON.stringify(data))
        // ),
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }
  GetCasesCountByYearChart$(rc: string) {
    return this.httpClient
      .get<ICasesCountByYear[]>(
        this.url + 'Team/CaseCountByYearChartAsync/' + rc ?? ''
      )
      .pipe(
        // tap((data) =>
        //   console.log('CaseCountByYearChartAsync >> ', JSON.stringify(data))
        // ),
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }

  GetTopInfractionsChart$(rc: string) {
    return this.httpClient
      .get<ITopInfractionsChart[]>(
        this.url + 'Team/TopInfractionsChartAsync/' + rc ?? ''
      )
      .pipe(
        // tap((data) =>
        //   console.log('TopInfractionsChartAsync >> ', JSON.stringify(data))
        // ),
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }
  //#endregion

  GetEmployeeBehaviorChart$(
    employeeBehaviorParameters: IEmployeeBehaviorParameters
  ) {
    return this.httpClient
      .post<IEmployeeBehaviorChart[]>(
        this.url + 'employeeBehavior/employeeBehaviorChartAsync',
        employeeBehaviorParameters
      )
      .pipe(
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }

}
