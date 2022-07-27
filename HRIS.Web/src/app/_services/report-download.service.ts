import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { IReportParam } from '../_models/IReportParam';
import { ErrorHandlingService } from './error-handling.service';
import { BaseService } from './_base.service';

@Injectable({
  providedIn: 'root'
})
export class ReportDownloadService extends BaseService {

  constructor(private httpClient: HttpClient,
    private errorHandlingService: ErrorHandlingService) {
    super();
  }

  get$(reportParam?: IReportParam) {

    return this.httpClient.post(
      this.url + 'download',
      reportParam, {
      observe: 'response',
      responseType: 'blob'
    })
      .pipe(
        tap((data) => {
          console.log(data);
        }),
        catchError(err => this.errorHandlingService.handleError(err))
      );
  }
}
