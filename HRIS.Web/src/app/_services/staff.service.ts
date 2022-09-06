import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import {
  IStaffDetail,
  IStaffEDUDetail,
  IStaffEmergencyContactInfo,
  IStaffOvertimeSummary,
} from '../_models/IStaffDetail';
import { ErrorHandlingService } from './error-handling.service';
import { BaseService } from './_base.service';

@Injectable({
  providedIn: 'root',
})
export class StaffService extends BaseService {
  constructor(
    private httpClient: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) {
    super();
  }

  detail$(ein: string) {
    return this.httpClient
      .get<IStaffDetail>(this.url + 'staff/detail/' + ein)
      .pipe(
        //tap((data) => {  console.log('detail$', data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  emergencyContactInfo$(ein: string) {
    return this.httpClient.get<IStaffEmergencyContactInfo[]>(
      this.url + 'staff/EmergencyContactInfo/' + ein
    );
  }

  staffEDUDetail$(ein: string) {
    return this.httpClient
      .get<IStaffEDUDetail>(this.url + 'team/StaffEDUDetail/' + ein)
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        catchError((err) => this.errorHandlingService.handleError(err))
      );
  }

  staffOTSummary$(ein: string, canlenderType: string = 'Calendar') {
    return this.httpClient
      .get<IStaffOvertimeSummary>(
        this.url + 'overtime/StaffOvertimeSummary/' + ein + '/' + canlenderType
      )
      .pipe(
        //tap((data) => {  console.log('$', data); }),
        //catchError((err) => this.errorHandlingService.handleError(err))
      );
  }
}
