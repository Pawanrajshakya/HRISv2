import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { IHeadcountChartData } from '../_models/IHeadcountChartData';
import { IReportParam } from '../_models/IReportParam';
import { ErrorHandlingService } from './error-handling.service';
import { BaseService } from './_base.service';

@Injectable({
  providedIn: 'root',
})
export class HeadcountService extends BaseService {
  constructor(
    private httpClient: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) {
    super();
  }

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
      .post<IHeadcountChartData[]>(this.url + 'Headcount/report', reportParam)
      .pipe(
        //tap((data) => console.log('Headcount/report >> ', JSON.stringify(data))),
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }

  titleSummaryReport$(reportParam: IReportParam) {
    return this.httpClient
      .post<IHeadcountChartData[]>(this.url + 'Headcount/titleSummaryReport', reportParam)
      .pipe(
        //tap((data) => console.log('Headcount/report >> ', JSON.stringify(data))),
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }

  titleAndBudgetReconciliationSummary$(reportParam: IReportParam) {
    return this.httpClient
      .post<IHeadcountChartData[]>(this.url + 'Headcount/titleAndBudgetReconciliationSummary', reportParam)
      .pipe(
        //tap((data) => console.log('Headcount/report >> ', JSON.stringify(data))),
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }

  titleAndBudgetSummary$(reportParam: IReportParam) {
    return this.httpClient
      .post<IHeadcountChartData[]>(this.url + 'Headcount/titleAndBudgetSummary', reportParam)
      .pipe(
        //tap((data) => console.log('Headcount/report >> ', JSON.stringify(data))),
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }

  pmsEmployeeDetail$(reportParam: IReportParam) {
    return this.httpClient
      .post<IHeadcountChartData[]>(this.url + 'Headcount/pmsEmployeeDetail', reportParam)
      .pipe(
        //tap((data) => console.log('Headcount/report >> ', JSON.stringify(data))),
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }
}
