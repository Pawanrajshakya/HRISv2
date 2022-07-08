import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICurrentUser } from './_models/ICurrentUser';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) {
  }

  ngOnInit() {
    console.log('Login step 1: AppComponent > ngOnInit > this.userService.loginSubject.next("");');
    this.userService.loginSubject.next("");
  }
}
