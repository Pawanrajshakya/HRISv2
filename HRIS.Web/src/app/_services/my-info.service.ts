import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IMyInfoTree } from '../_models/IMyInfoTree';
import {
  IMyInfoStaffInfo,
  IStaffEmergencyContactInfo,
  IStaffOvertimeSummary,
} from '../_models/IStaffDetail';
import { ErrorHandlingService } from './error-handling.service';
import { StaffService } from './staff.service';
import { BaseService } from './_base.service';
import { LoginService } from './login.service';
import { DynamicFlatNode } from '../_models/DynamicFlatNode';
import { DynamicFlatNodeService } from './DynamicFlatNode.service';

@Injectable({
  providedIn: 'root',
})
export class MyInfoService extends BaseService {
  //#region Tree
  myInfoTreeStaffs: IMyInfoTree[] = [];
  selectedMyInfoTreeStaff: IMyInfoTree = {};
  myInfoStaffInfo: IMyInfoStaffInfo = {};
  myInfoEmergencyContactStaffInfo: IStaffEmergencyContactInfo = {};
  myInfoOvertimeSummaryStaffInfo: IStaffOvertimeSummary = {};
  myInfoTreeStaffSelectedEvent = new EventEmitter<IMyInfoTree>();
  myStaffInfo: {
    myInfoStaffInfo?: IMyInfoStaffInfo;
    myInfoEmergencyContactStaffInfo?: IStaffEmergencyContactInfo;
    myInfoOvertimeSummaryStaffInfo?: IStaffOvertimeSummary;
  } = {};
  //#endregion

  constructor(
    private httpClient: HttpClient,
    private errorHandlingService: ErrorHandlingService,
    private staffService: StaffService,
    private loginService: LoginService  ) {
    super();
  }

  GetMyInfoTree$(): Observable<IMyInfoTree | null> {
    return this.httpClient
      .post<IMyInfoTree>(this.url + 'myInfo/myInfoTree', null)
      .pipe(
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }

  GetStaffInfo$(ein: string): Observable<IMyInfoStaffInfo | null> {
    return this.httpClient
      .get<IMyInfoStaffInfo>(this.url + 'myInfo/' + ein)
      .pipe(
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }

  GetChildren(tree: IMyInfoTree): Promise<IMyInfoTree[]> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<IMyInfoTree[]>(this.url + 'myInfo/myInfoTreeForEIN/' + tree.ein)
        .subscribe({
          next: (data) => {
            resolve(data);
          },
          error: (error) => {},
        });
    });
  }

  resolveTreeRoot(): Promise<IMyInfoTree[]> {
    return new Promise((resolve, reject) => {
      let lanID = (this.loginService.currentUser.lanID)? this.loginService.currentUser.lanID : '';
      this.httpClient
        .post<IMyInfoTree>(
          this.url + 'myInfo/myInfoTree/' +
          lanID, null
        )
        .subscribe({
          next: (data) => {
            //if (this.myInfoTreeStaffs.length > 0) this.myInfoTreeStaffs = [];
            this.myInfoTreeStaffs = [];
            this.myInfoTreeStaffs.push(data);
            this.selectedMyInfoTreeStaff = data;
            console.log('this.myInfoTreeStaffs.', data, this.myInfoTreeStaffs);

            if (data.ein) {
              this.GetStaffInfo(data.ein).then((data) => {
                if (data.myInfoStaffInfo)
                  this.myInfoStaffInfo = data.myInfoStaffInfo;
                if (data.myInfoEmergencyContactStaffInfo)
                  this.myInfoEmergencyContactStaffInfo =
                    data.myInfoEmergencyContactStaffInfo;
                if (data.myInfoOvertimeSummaryStaffInfo)
                  this.myInfoOvertimeSummaryStaffInfo =
                    data.myInfoOvertimeSummaryStaffInfo;
              });
            }
          },
          error: (error) => {},
          complete: () => {
            resolve(this.myInfoTreeStaffs);
          },
        });
    });
  }

  GetStaffInfo(ein: string): Promise<{
    myInfoStaffInfo?: IMyInfoStaffInfo;
    myInfoEmergencyContactStaffInfo?: IStaffEmergencyContactInfo;
    myInfoOvertimeSummaryStaffInfo?: IStaffOvertimeSummary;
  }> {
    return new Promise((resolve, reject) => {
      let myStaffInfo: {
        myInfoStaffInfo?: IMyInfoStaffInfo;
        myInfoEmergencyContactStaffInfo?: IStaffEmergencyContactInfo;
        myInfoOvertimeSummaryStaffInfo?: IStaffOvertimeSummary;
      } = {};
      this.GetStaffInfo$(ein).subscribe({
        next: (data) => {
          if (data) {
            myStaffInfo.myInfoStaffInfo = data;

            this.staffService.emergencyContactInfo$(ein).subscribe({
              next: (data) => {
                myStaffInfo.myInfoEmergencyContactStaffInfo = data[0];

                this.staffService.staffOTSummary$(ein).subscribe({
                  next: (data) => {
                    if (data) {
                      myStaffInfo.myInfoOvertimeSummaryStaffInfo = data;
                      resolve(myStaffInfo);
                    }
                  },
                });
              },
            });
          }
        },
        error: (error) => {
          reject(error);
        },
        complete: () => {},
      });
    });
  }
}
