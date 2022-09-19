import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './_services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  ngOnInit() {
    if (!environment.production)
      console.log(
        'Login step 1: AppComponent > ngOnInit > this.userService.loginSubject.next("");'
      );
    this.loginService.loginSubject.next('');
  }
}
