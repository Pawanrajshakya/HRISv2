import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { IHeadcountChartData } from '../_models/IHeadcountChartData';
import { ErrorHandlingService } from './error-handling.service';
import { BaseService } from './_base.service';

@Injectable({
  providedIn: 'root'
})
export class HeadcountService extends BaseService {
  constructor(
    private httpClient: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) {
    super();
  }

  
  headcountChart$ = this.httpClient
    .post<IHeadcountChartData[]>(this.url + 'Headcount/GetChartAsync', null)
    .pipe(
      catchError((err) => this.errorHandlingService.handleError(err)) //error handling
    );

  headcountChartByRCs$(rcs: string) {
    return this.httpClient
      .post<IHeadcountChartData[]>(this.url + 'Headcount/chart', rcs)
      .pipe(
        tap((data) => console.log('Headcount/chart >> ', JSON.stringify(data))),
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }

}
