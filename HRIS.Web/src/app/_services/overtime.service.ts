import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IBudgetedOT } from '../_models/IBudgetedOT';
import { IOvertimeCitytimeReport } from '../_models/IOvertimeCitytimeReport';
import {
  IOvertimeEarnedAnalysisReport,
  IOvertimeReport,
} from '../_models/IOvertimeReport';
import { IReportParam } from '../_models/IReportParam';
import { ErrorHandlingService } from './error-handling.service';
import { BaseService } from './_base.service';

@Injectable({
  providedIn: 'root',
})
export class OvertimeService extends BaseService {
  constructor(
    private httpClient: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) {
    super();
  }

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
}
