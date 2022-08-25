import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ErrorNotificationService } from './error-notification.service';
import { IHRISMessage } from '../_models/IHRISMessage';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor(private errorNotificationService: ErrorNotificationService) {}

  public handleError(
    err: HttpErrorResponse,
    userMessage?: string
  ): Observable<null> {
    let message: IHRISMessage = {
      type: 1,
      message: userMessage
        ? userMessage
        : 'HRIS - Internal Error. ' + err.error || err.message,
    };

    if (err.status >= 100 && err.status <= 299) message.type = 1;
    if (err.status >= 300 && err.status <= 499) message.type = 2;
    if (err.status >= 500) message.type = 3;

    this.errorNotificationService.notification.next(message);
    return of(null);
  }
}
