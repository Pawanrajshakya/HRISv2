import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { IEcard } from '../_models/IEcard';
import { ErrorHandlingService } from './error-handling.service';
import { BaseService } from './_base.service';

@Injectable({
  providedIn: 'root',
})
export class EcardService extends BaseService {
  constructor(
    private httpClient: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) {
    super();
  }

  eCards$ = this.httpClient
    .post<IEcard[]>(this.url + 'Ecard/GetChartAsync', null)
    .pipe(
      catchError((err) => this.errorHandlingService.handleError(err)) //error handling
    );
}
