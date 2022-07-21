import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { IAnnouncement } from '../_models/IAnnouncement';
import { IAnnouncementSummary } from "../_models/IAnnouncementSummary";
import { IAnnouncementList } from "../_models/IAnnouncementList";
import { IReportParam } from '../_models/IReportParam';
import { BaseService } from './_base.service';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService extends BaseService {

  constructor(private httpClient: HttpClient
    , private errorHandlingService: ErrorHandlingService) {
    super();
  }

  tableList$(tableViewParam?: IReportParam) {
    console.log('tableViewParam', tableViewParam?.pagination);
    return this.httpClient.post<IAnnouncementList[]>(this.url + 'announcement/list', tableViewParam?.pagination)
      .pipe(
        tap((data) => { console.log(data); }),
        catchError(err => this.errorHandlingService.handleError(err))
      );
  }

  getByUser$() {
    return this.httpClient.get<IAnnouncementSummary[]>(this.url + 'announcement')
      .pipe(
        tap((data) => { console.log(data); }),
        catchError(err => this.errorHandlingService.handleError(err))
      );
  }

  get$(id: number) {
    return this.httpClient.get<IAnnouncement>(this.url + 'announcement/' + id)
      .pipe(
        tap((data) => { console.log(data); }),
        catchError(err => this.errorHandlingService.handleError(err))
      );
  }


  updatePriority$(id: number, priority: number) {
    return this.httpClient.post<boolean>(this.url + 'announcement/' + id + '/' + priority, null)
      .pipe(
        tap((data) => { console.log(data); }),
        catchError(err => this.errorHandlingService.handleError(err))
      );
  }

  delete$(id: number) {
    console.log(id);
    return this.httpClient.delete<boolean>(this.url + 'announcement/' + id).pipe(
      tap((data) => { console.log(data); }),
      catchError(err => this.errorHandlingService.handleError(err))
    );
  }

  upload$(id: number, formData: FormData) {
    return this.httpClient.post(this.url + 'announcement/upload/' + id, formData, { responseType: 'text' }).pipe(
      tap((data) => { console.log('>', data); }),
      catchError(err => this.errorHandlingService.handleError(err, "Unable to upload file at this time. Please try later."))
    );
  }

  add$(announcement: IAnnouncement) {
    console.log(announcement);
    return this.httpClient.post(this.url + 'announcement', announcement).pipe(
      tap((data) => { console.log(data); }),
      catchError(err => this.errorHandlingService.handleError(err))
    );
  }

  update$(announcement: IAnnouncement) {
    console.log(announcement);
    return this.httpClient.put(this.url + 'announcement', announcement).pipe(
      tap((data) => { console.log(data); }),
      catchError(err => this.errorHandlingService.handleError(err))
    );
  }

}
