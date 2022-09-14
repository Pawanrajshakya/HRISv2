import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { ICurrentUser } from '../_models/ICurrentUser';
import { ErrorHandlingService } from './error-handling.service';
import { BaseService } from './_base.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseService {
  currentUser: ICurrentUser = {
    lastName: '',
    firstName: '',
    userGroups: [],
  };

  lanID: string = '';

  loginSubject = new Subject<string>();
  loginAction$ = this.loginSubject.asObservable();

  currentUserSubject = new Subject<ICurrentUser>();
  currentUserAction$ = this.currentUserSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) {
    super();

    this.loginAction$.subscribe({
      next: (lanID) => {
        this.lanID = lanID; //used in _header Intercepter

        this.user$.subscribe({
          next: (user: ICurrentUser | null) => {
            console.log(
              'Login step 3: UserService >> constructor >> this.user$.subscribe >> ',
              user,
              'this.currentUser >> ',
              this.currentUser
            );
            this.currentUserSubject.next(this.currentUser);
          },
        });
        console.log(
          'Login step 2: UserService >> constructor >> this.loginAction$.subscribe >> ',
          lanID
        );
      },
      error: (error) => {
        this.errorHandlingService.handleError(error);
      },
      complete: () => {},
    });
  }

  user$ = this.httpClient.get<ICurrentUser>(this.url + 'User').pipe(
    tap((user) => {
      if (user) {
        this.currentUser = user;
        this.currentUser.hasAdmin = user.groups?.indexOf(1) !== -1;
        this.currentUser.hasTEAMS = user.groups?.indexOf(2) !== -1;
        this.currentUser.hasOvertime = user.groups?.indexOf(3) !== -1;
        this.currentUser.hasPAR = user.groups?.indexOf(4) !== -1;
        this.currentUser.hasHeadcount = user.groups?.indexOf(5) !== -1;
        this.currentUser.hasEEO = user.groups?.indexOf(6) !== -1;
        this.currentUser.hasECards = user.groups?.indexOf(7) !== -1;
        this.currentUser.hasPEAS = user.groups?.indexOf(8) !== -1;
        this.currentUser.hasCustSvcComplaints = user.groups?.indexOf(9) !== -1;
        this.currentUser.hasAgencySeparation = user.groups?.indexOf(10) !== -1;
        this.currentUser.hasVacationRosters = user.groups?.indexOf(11) !== -1;
      }
    }),
    catchError((error) => this.errorHandlingService.handleError(error))
  );

  checkAuthentication(): Promise<ICurrentUser> {
    return new Promise((resolve, reject) => {
      if (
        !this.currentUser ||
        this.currentUser.lanID === undefined ||
        this.currentUser.lanID === null
      ) {
        console.log('Current User not found', this.currentUser);
        this.user$.subscribe({
          next: (currentUser) => {
            this.currentUser = currentUser as ICurrentUser;
            this.currentUserSubject.next(this.currentUser);
            resolve(this.currentUser);
          },
          error: (error) => {
            this.errorHandlingService.handleError(error);
          },
          complete: () => {},
        });
      } else {
        console.log('Current User found', this.currentUser);
        resolve(this.currentUser);
      }
    });
  }
}
