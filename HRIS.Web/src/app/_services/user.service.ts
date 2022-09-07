import { Injectable } from '@angular/core';
import { BaseService } from './_base.service';
import { IUser } from '../_models/IUser';
import { IUserList } from '../_models/IUserList';
import { ISearchUser } from '../_models/ISearchUser';
import { tap, catchError, map } from 'rxjs/operators';
import { IReportParam, ITableViewParam } from '../_models/IReportParam';
import { HttpClient } from '@angular/common/http';
import { IGroup } from '../_models/IGroup';
import { IRole } from '../_models/IRole';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(
    private httpClient: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) {
    super();
  }

  groups$ = this.httpClient.get<IGroup[]>(this.url + 'group').pipe(
    //tap(data => console.log('Groups >> ', JSON.stringify(data))), //debug - display in console
    catchError((err) => this.errorHandlingService.handleError(err)) //error handling
  );

  roles$ = this.httpClient.get<IRole[]>(this.url + 'role').pipe(
    //tap(data => console.log('Roles >> ', JSON.stringify(data))), //debug - display in console
    catchError((err) => this.errorHandlingService.handleError(err)) //error handling
  );

  tableList$(tableViewParam?: ITableViewParam) {
    return this.httpClient
      .post<IUserList[]>(this.url + 'User/list', tableViewParam)
      .pipe(
        //tap((data) => { console.log(data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  list$(tableViewParam?: IReportParam) {
    return this.httpClient
      .post<IUserList[]>(this.url + 'User/list', tableViewParam?.pagination)
      .pipe(
        //tap((data) => { console.log(data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  search$(searchBy: string, isSuper: boolean) {
    return this.httpClient
      .get<ISearchUser[]>(
        this.url + 'user/search/' + searchBy + '/' + isSuper.toString()
      )
      .pipe(
        //tap((data) => { console.log(data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  getByEIN$(ein: string, isSuper: boolean) {
    return this.httpClient
      .get<IUser>(this.url + 'user/' + ein + '/' + isSuper.toString())
      .pipe(
        //tap((data) => { console.log(data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  find$(ein: string) {
    return this.httpClient
      .post<boolean>(this.url + 'user/find/' + ein, null)
      .pipe(
        //tap((data) => { console.log(data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  add$(user: IUser) {
    return this.httpClient.post(this.url + 'user', user).pipe(
      tap((data) => {
        console.log(data);
      }),
      catchError((err) => this.errorHandlingService.handleError(err))
    );
  }

  update$(user: IUser) {
    return this.httpClient.put(this.url + 'user', user).pipe(
      tap((data) => {
        console.log(data);
      }),
      catchError((err) => this.errorHandlingService.handleError(err))
    );
  }

  delete$(userID: string) {
    return this.httpClient.delete(this.url + 'user/' + userID).pipe(
      tap((data) => {
        console.log(data);
      }),
      catchError((err) => this.errorHandlingService.handleError(err))
    );
  }

  isDeveloper(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let result = false;
      this.httpClient.get<boolean>(this.url + 'user/isDeveloper').subscribe({
        next: (data) => {
          if (data) result = data;
        },
        error: (err) => {},
        complete: () => {
          resolve(result);
        },
      });
    });
  }
}
