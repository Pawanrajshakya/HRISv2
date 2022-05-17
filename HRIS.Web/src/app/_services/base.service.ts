import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http/http';
import { Observable, throwError } from 'rxjs';
import { IHRISError, HRISError } from '../_models/hriserror';
import { isArray } from 'ngx-bootstrap/chronos';
import { isObject } from 'ngx-bootstrap/chronos/utils/type-checks';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  url: string = environment.apiUrl;
  hrisError: IHRISError = {};

  protected handleError(err: HttpErrorResponse, userMessage?: string): Observable<IHRISError> {

    this.hrisError = new HRISError();

    console.log(err);

    if (err.error instanceof ErrorEvent) {
      this.hrisError.message = `Status: ${err.status} Message: ${err.message} Error Message: ${err.error.message}`;
    } else {
      this.hrisError.message = `Message: ${err.error.message === undefined ? err.error : err.error.message}`;
    }

    if (userMessage !== undefined && userMessage.length > 0) {
      this.hrisError.userMessage = userMessage;
    }

    this.hrisError.errorNumber = err.status;

    console.log(this.hrisError);
    return throwError(this.hrisError);
  }

}
