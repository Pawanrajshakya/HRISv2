import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ICurrentUser } from '../_models/ICurrentUser';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { LoginService } from '../_services/login.service';
import { Route, Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  encapsulation: ViewEncapsulation.None,
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
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger | undefined;

  message: any;
  constructor(public loginService: LoginService, private location: Location) {
    this.currentUser$ = this.loginService.currentUserAction$;
  }

  onBack(): void {
    this.location.back();
  }

  // openMyMenu(menu: any) {
  //   console.log(menu);
  //   this.trigger?.openMenu();
  // }
  // closeMyMenu(menu: any) {
  //   console.log(menu);
  //   this.trigger?.closeMenu();
  // }

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
