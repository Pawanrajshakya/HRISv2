import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ErrorNotificationService } from './error-notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(private errorNotificationService: ErrorNotificationService) { }

  public handleError(err: HttpErrorResponse, userMessage?: string): Observable<null> {
    console.log('ErrorHandlingService', err);
    let message = err.message || "HRIS: unknown error";

    if (userMessage)
      message = userMessage;

    this.errorNotificationService.notification.next(message);
    return of(null);
  }

}
