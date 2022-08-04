import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { ITopInfractionsChart } from '../_models/ITopInfractionsChart';
import { ICasesCountByYear } from '../_models/ICasesCountByYear';
import { IPendingCasesChart } from '../_models/IPendingCasesChart';
import { BaseService } from './_base.service';
import { IEcard } from '../_models/IEcard';
import { IHeadcountChartData } from '../_models/IHeadcountChartData';
import { ErrorHandlingService } from './error-handling.service';
import { IAgencySeparationChart } from '../_models/IAgencySeparationChart';
import { IBudgetedOT } from '../_models/IBudgetedOT';
import { IReportParam } from '../_models/IReportParam';

@Injectable({
  providedIn: 'root',
})
export class ChartService extends BaseService {
  constructor(
    private httpClient: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) {
    super();
  }

  pendingCasesChart$ = this.httpClient
    .get<IPendingCasesChart[]>(this.url + 'Team/PendingCasesChartAsync')
    .pipe(
      tap((data) =>
        console.log('PendingCasesChartAsync >> ', JSON.stringify(data))
      ),
      catchError((err) => this.errorHandlingService.handleError(err)) //error handling
    );

  casesCountByYearChart$ = this.httpClient
    .get<ICasesCountByYear[]>(this.url + 'Team/CaseCountByYearChartAsync')
    .pipe(
      tap((data) =>
        console.log('CaseCountByYearChartAsync >> ', JSON.stringify(data))
      ),
      catchError((err) => this.errorHandlingService.handleError(err)) //error handling
    );

  topInfractionsChart$ = this.httpClient
    .get<ITopInfractionsChart[]>(this.url + 'Team/TopInfractionsChartAsync')
    .pipe(
      tap((data) =>
        console.log('TopInfractionsChartAsync >> ', JSON.stringify(data))
      ),
      catchError((err) => this.errorHandlingService.handleError(err)) //error handling
    );

  eCards$ = this.httpClient
    .post<IEcard[]>(this.url + 'Ecard/GetChartAsync', null)
    .pipe(
      tap((data) => console.log('Ecards >> ', JSON.stringify(data))),
      catchError((err) => this.errorHandlingService.handleError(err)) //error handling
    );

  headcountChart$ = this.httpClient
    .post<IHeadcountChartData[]>(this.url + 'Headcount/GetChartAsync', null)
    .pipe(
      tap((data) =>
        console.log('Headcount/GetChartAsync >> ', JSON.stringify(data))
      ),
      catchError((err) => this.errorHandlingService.handleError(err)) //error handling
    );

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
}
