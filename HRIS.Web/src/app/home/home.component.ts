import { Component } from '@angular/core';
import { ICurrentUser } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentUser: ICurrentUser;
  hasHeadcount: Boolean = false;

  constructor(private userService: UserService) {
    this.currentUser = this.userService.currentUser;
    this.hasHeadcount = this.userService.currentUser.groups?.indexOf(5) !== -1;
  }

}
