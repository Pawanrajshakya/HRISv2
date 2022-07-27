import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { IActiveStaff } from '../_models/IActiveStaff';
import { IAgencySeparationParam, IReportParam } from '../_models/IReportParam';
import { IStaffDetail, IStaffEDUDetail, IStaffEmergencyContactInfo, IStaffOvertimeSummary } from '../_models/IStaffDetail';
import { IStaffEmergencyContactInfoReport } from '../_models/IStaffEmergencyContactInfoReport';
import { IVacationRosterReport } from "../_models/IVacationRosterReport";
import { IStaffLeaveReport } from '../_models/IStaffLeaveReport';
import { ErrorHandlingService } from './error-handling.service';
import { BaseService } from './_base.service';
import { IAgencySeparationSummary } from '../_models/IAgencySeparationSummary';

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
    return this.httpClient.post<IActiveStaff[]>(this.url + 'hrisReport/activeStaffReport', tableViewParam)
      .pipe(
        //tap((data) => { console.log(data); }),
        catchError(err => this.errorHandlingService.handleError(err))
      );
  }

  leaveReport$(tableViewParam?: IReportParam) {
    console.log('tableViewParam', tableViewParam);
    return this.httpClient.post<IStaffLeaveReport[]>(this.url + 'hrisReport/leaveReport', tableViewParam)
      .pipe(
        //tap((data) => { console.log(data); }),
        catchError(err => this.errorHandlingService.handleError(err))
      );
  }

  ceasedReport$(tableViewParam?: IReportParam) {
    console.log('tableViewParam', tableViewParam);
    return this.httpClient.post<IStaffLeaveReport[]>(this.url + 'hrisReport/ceasedReport', tableViewParam)
      .pipe(
        //tap((data) => { console.log(data); }),
        catchError(err => this.errorHandlingService.handleError(err))
      );
  }

  emergencyContactInfoReport$(tableViewParam?: IReportParam) {
    return this.httpClient.post<IStaffEmergencyContactInfoReport>(this.url + 'hrisReport/emergencyContactInfoReport', tableViewParam)
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError(err => this.errorHandlingService.handleError(err))
      );
  }

  vacationRosterReport$(tableViewParam?: IReportParam) {
    return this.httpClient.post<IVacationRosterReport>(this.url + 'hrisReport/vactionRoasterReport', tableViewParam)
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError(err => this.errorHandlingService.handleError(err))
      );
  }

  agencySeparation$(tableViewParam?: IAgencySeparationParam) {
    return this.httpClient.post<IAgencySeparationSummary>(this.url + 'agencySeparation/summary', tableViewParam)
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
