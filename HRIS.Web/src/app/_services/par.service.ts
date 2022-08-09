import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IPARDetail, IPARReport } from '../_models/IPARReport';
import { IPARParam } from '../_models/IReportParam';
import { ErrorHandlingService } from './error-handling.service';
import { BaseService } from './_base.service';

@Injectable({
  providedIn: 'root',
})
export class ParService extends BaseService {
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
}
