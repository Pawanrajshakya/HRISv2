import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { IAgencySeparationChart } from '../_models/IAgencySeparationChart';
import { IReportParam } from '../_models/IReportParam';
import { ErrorHandlingService } from './error-handling.service';
import { BaseService } from './_base.service';

@Injectable({
  providedIn: 'root'
})
export class AgencySeparationService extends BaseService {
  constructor(
    private httpClient: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) {
    super();
  }

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
}
