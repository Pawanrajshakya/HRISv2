import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ISearchUser, ICurrentUser, IUserList, IUser } from '../_models/user';
import { Subject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { ITableViewParam } from '../_models/report-param';
import { HttpClient } from '@angular/common/http';
import { HRISError, IHRISError } from '../_models/hriserror';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  lanID: string = "";

  currentUser: ICurrentUser = {
    lastName: '',
    firstName: '',
    userGroups: []
  };

  loginSubject = new Subject<string>();
  loginAction$ = this.loginSubject.asObservable();

  currentUserSubject = new Subject<ICurrentUser>();
  currentUserAction$ = this.currentUserSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    super();
    this.loginAction$.subscribe((lanID) => {
      console.log('Login step 2: UserService >> constructor >> this.loginAction$.subscribe >> ', lanID);
      this.lanID = lanID;//used in _header Intercepter
      this.user$.subscribe((user: ICurrentUser | IHRISError) => {
        console.log('Login step 3: UserService >> constructor >> this.user$.subscribe >> ', user);
        this.currentUserSubject.next(this.currentUser);
      })
    })
  }

  user$ = this.httpClient.get<ICurrentUser>(this.url + "User")
    .pipe(
      tap(user => {
        this.currentUser = user;
      }),
      catchError(err => this.handleError(err))
    );

  list$(tableViewParam?: ITableViewParam) {
    console.log('tableViewParam', tableViewParam);
    return this.httpClient.post<IUserList[]>(this.url + 'User/list', tableViewParam)
      .pipe(
        //tap((data) => { console.log(data); }),
        catchError(err => this.handleError(err))
      );
  }

  search$(searchBy: string, isSuper: boolean) {
    return this.httpClient.get<ISearchUser[]>(this.url + 'user/search/' + searchBy + '/' + isSuper.toString()).pipe(
      //tap((data) => { console.log(data); }),
      catchError(err => this.handleError(err))
    );
  }

  getByEIN$(ein: string, isSuper: boolean) {
    return this.httpClient.get<IUser>(this.url + 'user/' + ein + '/' + isSuper.toString()).pipe(
      //tap((data) => { console.log(data); }),
      catchError(err => this.handleError(err))
    );
  }

  add$(user: IUser) {
    console.log(user);
    return this.httpClient.post(this.url + 'user', user).pipe(
      tap((data) => { console.log(data); }),
      catchError(err => this.handleError(err))
    );
  }

  update$(user: IUser) {
    console.log(user);
    return this.httpClient.put(this.url + 'user', user).pipe(
      tap((data) => { console.log(data); }),
      catchError(err => this.handleError(err))
    );
  }

  delete$(userID: string) {
    console.log(userID);
    return this.httpClient.delete(this.url + 'user/' + userID).pipe(
      tap((data) => { console.log(data); }),
      catchError(err => this.handleError(err))
    );
  }
}
