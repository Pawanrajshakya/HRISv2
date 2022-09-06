import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ICurrentUser } from '../_models/ICurrentUser';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { LoginService } from '../_services/login.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  currentUser$: Observable<ICurrentUser>;

  message: any;
  constructor(public loginService: LoginService) {
    this.currentUser$ = this.loginService.currentUserAction$;
  }

  onClassificationReportClick(i: number) {
    console.log(i);
    if (i === 1) {
      window.open(
        'https://rs16reports.hra.nycnet/ReportServer/Pages/ReportViewer.aspx?%2FOSR%20Reports%2FCOD%20Reporting%20Log&rs%3ACommand=Render&viewAll=False&RCs=',
        '_blank'
      );
    } else {
      window.open(
        'https://rs16reports.hra.nycnet/ReportServer/Pages/ReportViewer.aspx?%2FOSR%20Reports%2FCOD%20Reporting%20Log&rs%3ACommand=Render&viewAll=True&RCs=',
        '_blank'
      );
    }
  }
}
