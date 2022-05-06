import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { IAnnouncementList } from '../_models/announcement';
import { IReportParam } from '../_models/report-param';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  tableList$(tableViewParam?: IReportParam) {
    console.log('tableViewParam', tableViewParam?.pagination);
    return this.httpClient.post<IAnnouncementList[]>(this.url + 'announcement/list', tableViewParam?.pagination)
      .pipe(
        tap((data) => { console.log(data); }),
        catchError(err => this.handleError(err))
      );
  }

  updatePriority$(id: number, priority: number) {
    return this.httpClient.post<boolean>(this.url + 'announcement/' + id + '/' + priority, null)
      .pipe(
        tap((data) => { console.log(data); }),
        catchError(err => this.handleError(err))
      );
  }

  delete$(id: number) {
    console.log(id);
    return this.httpClient.delete<boolean>(this.url + 'announcement/' + id).pipe(
      tap((data) => { console.log(data); }),
      catchError(err => this.handleError(err))
    );
  }
}
