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

    console.log('handleError', err, err.status, err);

    if (userMessage !== undefined && userMessage.length > 0) {
      this.hrisError.userMessage = userMessage;
    } else {
      this.hrisError.userMessage = (err.status ?? "") + " HRIS: " + (err.statusText ?? "") +  " Please try later."
    }

    // this.hrisError.userMessage = ". Internal Error.";


    // if (err.error instanceof ErrorEvent) {
    //   if (err.status === 0) {
    //     this.hrisError.message = err.url + " -> " + err.status + " -> " + err.statusText;
    //     this.hrisError.userMessage = err.status + " -> " + err.statusText + ". Internal Error.";
    //   } else {
    //     this.hrisError.message = `Status: ${err.status} Message: ${err.message} Error Message: ${err.error.message}`;
    //   }
    // } else if (err.error !== undefined && err.error !== null) {
    //   this.hrisError.message = `Message: ${err.error.message === undefined ? err.error : err.error.message}`;
    // } else {

    // }

    // if (userMessage !== undefined && userMessage.length > 0) {
    //   this.hrisError.userMessage = userMessage;
    // }

    // this.hrisError.errorNumber = err.status;

    // console.log(this.hrisError);
    return throwError(this.hrisError);
  }

}
