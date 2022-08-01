import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IHRISMessage } from '../_models/IHRISMessage';
import { ErrorNotificationService } from '../_services/error-notification.service';

@Component({
  selector: 'app-error',
  template: '',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  errorMessage: string = '';

  constructor(
    private errorNotificationService: ErrorNotificationService,
    protected snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.errorNotificationService.notification.subscribe({
      next: (_message) => {
        let message: any = {};

        message = _message
          ? (_message as IHRISMessage)
          : { type: 0, message: 'HRIS: Internal Error.' };

        if (message?.type === 1) {
          this.snackBar.open(message.message, 'X', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 10000,
            panelClass: ['snackbarInfo'],
          });
        } else if (message?.type === 2) {
          this.snackBar.open(message.message, 'X', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 10000,
            panelClass: ['snackbarWarning'],
          });
        } else if (message?.type === 3) {
          this.snackBar.open(message.message, 'X', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 10000,
            panelClass: ['snackbarError'],
          });
        }
      },
    });
  }
}
