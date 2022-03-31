import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http/http';
import { Observable, throwError } from 'rxjs';
import { IHRISError, HRISError } from '../_models/hriserror';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  url: string = environment.apiUrl;
  hrisError: IHRISError = {};

  protected handleError(err: HttpErrorResponse, userMessage?: string): Observable<IHRISError> {

    this.hrisError = new HRISError();

    if (err.error instanceof ErrorEvent) {

      this.hrisError.message = `An error occurred ${err.error.message}`;

    } else {

      this.hrisError.message = `Backend returned code ${err.status}: ${err.message}`;

    }
    console.log(this.hrisError);
    this.hrisError.errorNumber = -100;

    this.hrisError.userMessage = userMessage ?? "Internal Error. Please contact your system admin.";

    return throwError(this.hrisError);
  }

}
