import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { IReportParam } from '../_models/report-param';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  staffListReport$() {
    let reportParam: IReportParam = {
      detail: {
        reportName: 'SearchStaffReport',
        format: 'excel'
      }, pagination: {
      }, rcDp : {
        rCList: ['1419'],
        dPList: ['1419|BNP4','1419|BNP5','1419|BNP6']
      }, code: {
      }
    }
    return this.httpClient.post<Blob>(this.url + 'report', reportParam)
      .pipe(
        //tap((data) => { console.log(data); }),
        catchError(err => this.handleError(err))
      );
  }
}
