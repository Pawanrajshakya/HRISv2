import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { IPARDetail, IPARReport } from '../_models/IPARReport';
import { IPARParam } from '../_models/IReportParam';
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

  parReport$(tableViewParam?: IPARParam) {
    return this.httpClient
      .post<IPARReport[]>(this.url + 'par/report', tableViewParam)
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  parDetail$(reqNumber: string) {
    return this.httpClient
      .get<IPARDetail[]>(this.url + 'par/detail/' + reqNumber)
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }
}
