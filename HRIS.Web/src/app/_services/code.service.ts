import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { IBackupTitle } from '../_models/IBackupTitle';
import { ICSStatus } from '../_models/ICSStatus';
import { IEmployeeBehavior } from '../_models/IEmployeeBehavior';
import { ILeaveStatus } from '../_models/ILeaveStatus';
import { ILocation } from '../_models/ILocation';
import { IRC, IDP, IRC_DP } from '../_models/IRC_DP';
import { ITitle } from '../_models/ITitle';
import { ErrorHandlingService } from './error-handling.service';
import { BaseService } from './_base.service';

@Injectable({
  providedIn: 'root'
})
export class CodeService extends BaseService {

  rc_dp: IRC_DP = {};
  locations: ILocation[] = [];
  titles: ITitle[] = [];
  bkpTitles: IBackupTitle[] = [];
  csStatuses: ICSStatus[] = [];
  lvStatuses: ILeaveStatus[] = [];

  constructor(private httpClient: HttpClient
    , private errorHandlingService: ErrorHandlingService) {
    super();
  }

  resolveRCDP(): Promise<IRC_DP> {
    return new Promise((resolve, reject) => {
      console.log('resolveRCDP', this.rc_dp.RC)
      if (this.rc_dp.RC === undefined || this.rc_dp.RC === null || this.rc_dp.RC.length === 0) {

        this.httpClient.get<IRC[]>(this.url + 'code/rc').subscribe({
          next: data => {
            this.rc_dp.RC = data;
          }, error: (error) => { }, complete: () => {
            this.httpClient.get<IDP[]>(this.url + 'code/dp').subscribe({
              next: data => {
                this.rc_dp.DP = data;
              }, error: (error) => { }, complete: () => {
                resolve(this.rc_dp);
              }
            });
          }
        });
      } else {
        resolve(this.rc_dp);
      };
    });
  }

  resolveTitle(): Promise<ITitle[]> {
    return new Promise((resolve, reject) => {
      if (this.titles === undefined || this.titles === null || this.titles.length === 0) {

        this.httpClient.get<ITitle[]>(this.url + 'code/title').subscribe({
          next: data => {
            this.titles = data;
          }, error: (error) => { }, complete: () => {
            resolve(this.titles);
          }
        });
      } else {
        resolve(this.titles);
      };
    });
  }

  resolveLvStatus(): Promise<ILeaveStatus[]> {
    return new Promise((resolve, reject) => {
      console.log('resolveLvStatus', this.lvStatuses)
      if (this.lvStatuses === undefined || this.lvStatuses === null || this.lvStatuses.length === 0) {
        this.httpClient.get<ILeaveStatus[]>(this.url + 'code/leaveStatus').subscribe({
          next: data => {
            this.lvStatuses = data;
          }, error: (error) => { }, complete: () => {
            resolve(this.lvStatuses);
          }
        });
      } else {
        resolve(this.lvStatuses);
      };
    });
  }

  resolveLocation(): Promise<ILocation[]> {
    return new Promise((resolve, reject) => {
      console.log('resolveTitles', this.locations)
      if (this.locations === undefined || this.locations === null || this.locations.length === 0) {

        this.httpClient.get<ILocation[]>(this.url + 'code/location').subscribe({
          next: data => {
            this.locations = data;
          }, error: (error) => { }, complete: () => {
            resolve(this.locations);
          }
        });
      } else {
        resolve(this.locations);
      };
    });
  }

  resolveBkpTitle(): Promise<IBackupTitle[]> {
    return new Promise((resolve, reject) => {
      console.log('resolveBkpTitles');
      if (this.bkpTitles === undefined || this.bkpTitles === null || this.bkpTitles.length === 0) {
        this.httpClient.get<IBackupTitle[]>(this.url + 'code/bkpTitle').subscribe({
          next: data => {
            this.bkpTitles = data;
          }, error: (error) => { }, complete: () => {
            resolve(this.bkpTitles);
          }
        });
      } else {
        resolve(this.bkpTitles);
      };
    });
  }

  resolveCSStatus(): Promise<ICSStatus[]> {
    return new Promise((resolve, reject) => {
      console.log('resolveCSStatus');
      if (this.csStatuses === undefined || this.csStatuses === null || this.csStatuses.length === 0) {
        this.httpClient.get<ICSStatus[]>(this.url + 'code/csStatus').subscribe({
          next: data => {
            this.csStatuses = data;
          }, error: (error) => { }, complete: () => {
            resolve(this.csStatuses);
          }
        });
      } else {
        resolve(this.csStatuses);
      };
    });
  }

  rcs$ = this.httpClient.get<IRC[]>(this.url + 'code/rc').pipe(
    catchError(err => this.errorHandlingService.handleError(err)) //error handling
  );

  dps$ = this.httpClient.get<IDP[]>(this.url + 'code/dp').pipe(
    //tap(data => console.log('dps >> ', JSON.stringify(data))), //debug - display in console
    catchError(err => this.errorHandlingService.handleError(err)) //error handling
  );

  // dpsByRC$(rc: string) {
  //   return this.httpClient.get<IDP[]>(this.url + `DP/` + rc)
  //     .pipe(
  //       // tap((data) => { console.log(data); }),
  //       catchError(err => this.errorHandlingService.handleError(err))
  //     );
  // };

  locations$ = this.httpClient.get<ILocation[]>(this.url + 'code/location').pipe(
    //tap(data => console.log('locations >> ', JSON.stringify(data))), //debug - display in console
    catchError(err => this.errorHandlingService.handleError(err)) //error handling
  );

  titles$ = this.httpClient.get<ITitle[]>(this.url + 'code/title').pipe(
    //tap(data => console.log('title >> ', JSON.stringify(data))), //debug - display in console
    catchError(err => this.errorHandlingService.handleError(err)) //error handling
  );

  bkpTitles$ = this.httpClient.get<IBackupTitle[]>(this.url + 'code/bkpTitle').pipe(
    //tap(data => console.log('bkptitle >> ', JSON.stringify(data))), //debug - display in console
    catchError(err => this.errorHandlingService.handleError(err)) //error handling
  );

  csStatuses$ = this.httpClient.get<ICSStatus[]>(this.url + 'code/csStatus').pipe(
    //tap(data => console.log('csStatus >> ', JSON.stringify(data))), //debug - display in console
    catchError(err => this.errorHandlingService.handleError(err)) //error handling
  );

  employeeBehaviors$ = this.httpClient.get<IEmployeeBehavior[]>(this.url + 'code/employeeBehavior').pipe(
    //tap(data => console.log('employeeBehavior >> ', JSON.stringify(data))), //debug - display in console
    catchError(err => this.errorHandlingService.handleError(err)) //error handling
  );

  leaveStatuses$ = this.httpClient.get<ILeaveStatus[]>(this.url + 'code/leaveStatus').pipe(
    //tap(data => console.log('leaveStatus >> ', JSON.stringify(data))), //debug - display in console
    catchError(err => this.errorHandlingService.handleError(err)) //error handling
  );

  // retirementResignationFMLAs$ = this.httpClient.get<IRetirementResignationFMLA[]>(this.url + 'code/retirementResignationFMLA').pipe(
  //   tap(data => console.log('RetirementResignationFMLA >> ', JSON.stringify(data))), //debug - display in console
  //   catchError(err => this.errorHandlingService.handleError(err)) //error handling
  // );
}
