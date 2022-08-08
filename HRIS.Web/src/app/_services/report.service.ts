import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IOvertimeCitytimeReport } from '../_models/IOvertimeCitytimeReport';
import {
  IOvertimeEarnedAnalysisReport,
  IOvertimeReport,
} from '../_models/IOvertimeReport';
import { IPARDetail, IPARReport } from '../_models/IPARReport';
import { IPARParam, IReportParam } from '../_models/IReportParam';
import { ErrorHandlingService } from './error-handling.service';
import { BaseService } from './_base.service';

@Injectable({
  providedIn: 'root',
})
export class ReportService extends BaseService {
  constructor(
    private httpClient: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) {
    super();
  }

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
}
