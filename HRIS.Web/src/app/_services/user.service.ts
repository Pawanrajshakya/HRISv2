import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { SearchUser, User } from '../_models/user';
import { Subject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { ReportParam } from '../_models/report-param';
import { UserList } from '../_models/user-list';
import { HttpClient } from '@angular/common/http';
import { HRISError, IHRISError } from '../_models/hriserror';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  lanID: string = "";

  currentUser: User = {
    lastName: '',
    firstName: '',
    userGroups: []
  };

  loginSubject = new Subject<string>();
  loginAction$ = this.loginSubject.asObservable();

  currentUserSubject = new Subject<User>();
  currentUserAction$ = this.currentUserSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    super();
    this.loginAction$.subscribe((lanID) => {
      console.log('Login step 2: UserService >> constructor >> this.loginAction$.subscribe >> ', lanID);
      this.lanID = lanID;//used in _header Intercepter
      this.user$.subscribe((user: User | IHRISError) => {
        console.log('Login step 3: UserService >> constructor >> this.user$.subscribe >> ', user);
        this.currentUserSubject.next(this.currentUser);
      })
    })
  }

  user$ = this.httpClient.get<User>(this.url + "User")
    .pipe(
      tap(user => {
        this.currentUser = user;
      }),
      catchError(err => this.handleError(err))
    );

  list$(reportParams?: ReportParam) {
    console.log('reportParams', reportParams);
    return this.httpClient.post<UserList[]>(this.url + 'User/list', reportParams)
      .pipe(
        tap((data) => { console.log(data); }),
        catchError(err => this.handleError(err))
      );
  }

  search$(searchBy: string, isSuper: boolean) {
    return this.httpClient.get<SearchUser[]>(this.url + 'user/search/' + searchBy + '/' + isSuper.toString());
  }
}
