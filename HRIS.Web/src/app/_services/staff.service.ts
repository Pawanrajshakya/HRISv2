import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { IActiveStaff } from '../_models/IActiveStaff';
import { IReportParam } from '../_models/IReportParam';
import { IStaffDetail, IStaffEDUDetail, IStaffEmergencyContactInfo, IStaffOvertimeSummary } from '../_models/IStaffDetail';
import { IStaffEmergencyContactInfoReport } from '../_models/IStaffEmergencyContactInfoReport';
import { IStaffLeaveReport } from '../_models/IStaffLeaveReport';
import { ErrorHandlingService } from './error-handling.service';
import { BaseService } from './_base.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService extends BaseService {

  constructor(private httpClient: HttpClient
    , private errorHandlingService: ErrorHandlingService) {
    super();
  }

  activeStaffReport$(tableViewParam?: IReportParam) {
    console.log('tableViewParam', tableViewParam);
    return this.httpClient.post<IActiveStaff[]>(this.url + 'staff/activeStaffReport', tableViewParam)
      .pipe(
        //tap((data) => { console.log(data); }),
        catchError(err => this.errorHandlingService.handleError(err))
      );
  }

  leaveReport$(tableViewParam?: IReportParam) {
    console.log('tableViewParam', tableViewParam);
    return this.httpClient.post<IStaffLeaveReport[]>(this.url + 'staff/leaveReport', tableViewParam)
      .pipe(
        //tap((data) => { console.log(data); }),
        catchError(err => this.errorHandlingService.handleError(err))
      );
  }

  ceasedReport$(tableViewParam?: IReportParam) {
    console.log('tableViewParam', tableViewParam);
    return this.httpClient.post<IStaffLeaveReport[]>(this.url + 'staff/ceasedReport', tableViewParam)
      .pipe(
        //tap((data) => { console.log(data); }),
        catchError(err => this.errorHandlingService.handleError(err))
      );
  }

  emergencyContactInfoReport$(tableViewParam?: IReportParam) {
    return this.httpClient.post<IStaffEmergencyContactInfoReport>(this.url + 'staff/emergencyContactInfoReport' , tableViewParam)
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError(err => this.errorHandlingService.handleError(err))
      );
  }

  detail$(ein: string) {
    return this.httpClient.get<IStaffDetail>(this.url + 'staff/detail/' + ein)
      .pipe(
        //tap((data) => {  console.log('detail$', data); }),
        catchError(err => this.errorHandlingService.handleError(err))
      );
  }

  emergencyContactInfo$(ein: string) {
    return this.httpClient.get<IStaffEmergencyContactInfo[]>(this.url + 'staff/EmergencyContactInfo/' + ein);
  }

  staffEDUDetail$(ein: string) {
    return this.httpClient.get<IStaffEDUDetail>(this.url + 'team/StaffEDUDetail/' + ein)
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError(err => this.errorHandlingService.handleError(err))
      );
  }

  staffOTSummary$(ein: string, canlenderType: string = "Calendar") {
    return this.httpClient.get<IStaffOvertimeSummary>(
      this.url + 'overtime/StaffOvertimeSummary/' + ein + '/' + canlenderType)
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError(err => this.errorHandlingService.handleError(err))
      );
  }
}
