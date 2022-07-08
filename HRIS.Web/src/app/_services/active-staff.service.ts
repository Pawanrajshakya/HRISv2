import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { IActiveStaff } from '../_models/IActiveStaff';
import { IReportParam } from '../_models/IReportParam';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveStaffService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  list$(tableViewParam?: IReportParam) {
    console.log('tableViewParam', tableViewParam);
    return this.httpClient.post<IActiveStaff[]>(this.url + 'staff/list', tableViewParam)
      .pipe(
        tap((data) => { console.log(data); }),
        catchError(err => this.handleError(err))
      );
  }
}
