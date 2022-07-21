import { Component } from '@angular/core';
import { ICurrentUser } from "../_models/ICurrentUser";
import { LoginService } from '../_services/login.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public loginService: LoginService) {
  }

}
