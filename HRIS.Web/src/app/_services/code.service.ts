import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { IBackupTitle } from '../_models/IBackupTitle';
import { ICSStatus } from '../_models/ICSStatus';
import { IDP } from '../_models/IDP';
import { IEmployeeBehavior } from '../_models/IEmployeeBehavior';
import { ILeaveStatus } from '../_models/ILeaveStatus';
import { ILocation } from '../_models/ILocation';
import { IRC } from '../_models/IRC';
import { IRetirementResignationFMLA } from '../_models/IRetirementResignationFMLA';
import { ITitle } from '../_models/ITitle';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CodeService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  rcs$ = this.httpClient.get<IRC[]>(this.url + 'code/rc').pipe(
    //tap(data => console.log('rcs >> ', JSON.stringify(data))), //debug - display in console
    catchError(err => this.handleError(err)) //error handling
  );

  dps$ = this.httpClient.get<IDP[]>(this.url + 'code/dp').pipe(
    //tap(data => console.log('dps >> ', JSON.stringify(data))), //debug - display in console
    catchError(err => this.handleError(err)) //error handling
  );

  dpsByRC$(rc: string) {
    return this.httpClient.get<IDP[]>(this.url + `DP/` + rc)
      .pipe(
        // tap((data) => { console.log(data); }),
        catchError(err => this.handleError(err))
      );
  };

  locations$ = this.httpClient.get<ILocation[]>(this.url + 'code/location').pipe(
    tap(data => console.log('locations >> ', JSON.stringify(data))), //debug - display in console
    catchError(err => this.handleError(err)) //error handling
  );

  titles$ = this.httpClient.get<ITitle[]>(this.url + 'code/title').pipe(
    tap(data => console.log('title >> ', JSON.stringify(data))), //debug - display in console
    catchError(err => this.handleError(err)) //error handling
  );

  bkpTitles$ = this.httpClient.get<IBackupTitle[]>(this.url + 'code/bkpTitle').pipe(
    tap(data => console.log('bkptitle >> ', JSON.stringify(data))), //debug - display in console
    catchError(err => this.handleError(err)) //error handling
  );

  csStatuses$ = this.httpClient.get<ICSStatus[]>(this.url + 'code/csStatus').pipe(
    tap(data => console.log('csStatus >> ', JSON.stringify(data))), //debug - display in console
    catchError(err => this.handleError(err)) //error handling
  );

  employeeBehaviors$ = this.httpClient.get<IEmployeeBehavior[]>(this.url + 'code/employeeBehavior').pipe(
    tap(data => console.log('employeeBehavior >> ', JSON.stringify(data))), //debug - display in console
    catchError(err => this.handleError(err)) //error handling
  );

  leaveStatuses$ = this.httpClient.get<ILeaveStatus[]>(this.url + 'code/leaveStatus').pipe(
    tap(data => console.log('leaveStatus >> ', JSON.stringify(data))), //debug - display in console
    catchError(err => this.handleError(err)) //error handling
  );

  // retirementResignationFMLAs$ = this.httpClient.get<IRetirementResignationFMLA[]>(this.url + 'code/retirementResignationFMLA').pipe(
  //   tap(data => console.log('RetirementResignationFMLA >> ', JSON.stringify(data))), //debug - display in console
  //   catchError(err => this.handleError(err)) //error handling
  // );
}
