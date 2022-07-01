import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';
import { ICurrentUser } from "../_models/ICurrentUser";
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

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
  constructor(private userService: UserService) {
    this.currentUser$ = this.userService.currentUserAction$;
    this.message = this.userService.hrisError.message;
  }

}
