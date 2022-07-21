import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorNotificationService } from '../_services/error-notification.service';

@Component({
  selector: 'app-error',
  template: '',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorMessage: string = "";

  constructor(private errorNotificationService: ErrorNotificationService, protected snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.errorNotificationService.notification.subscribe({
      next: (message) => {
        if (message) {
          this.snackBar.open(message, 'Close', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 10000,
          });
        }
      }
    })
  }

}
