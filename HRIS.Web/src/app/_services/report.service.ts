import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { IReportParam } from '../_models/IReportParam';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  get$(reportParam?: IReportParam) {

    return this.httpClient.post(
      this.url + 'report', 
      reportParam, { 
        observe: 'response', 
        responseType: 'blob' })
      .pipe(
        tap((data) => { 
          console.log(data); 
        }),
        catchError(err => this.handleError(err))
      );
  }
}
