import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ICurrentUser } from "../_models/ICurrentUser";
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavComponent {

  currentUser$: Observable<ICurrentUser>;

  message: any;
  constructor(public loginService: LoginService) {
    this.currentUser$ = this.loginService.currentUserAction$;
  }

}
