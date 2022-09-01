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

@Injectable({
  providedIn: 'root',
})
export class MyInfoService extends BaseService {
  //#region Tree
  tree: IMyInfoTree[] = [];
  selectedTree: IMyInfoTree = {};
  selectedTreeInfo: IMyInfoStaffInfo = {};
  selectedTree_Emergency_Info: IStaffEmergencyContactInfo = {};
  selectedTree_Overtime_Info: IStaffOvertimeSummary = {};
  myInfoTreeStaffSelectedEvent = new EventEmitter<IMyInfoTree>();
  //#endregion

  constructor(
    private httpClient: HttpClient,
    private errorHandlingService: ErrorHandlingService,
    private staffService: StaffService,
    private loginService: LoginService
  ) {
    super();
  }

  GetTree$(): Observable<IMyInfoTree | null> {
    return this.httpClient
      .post<IMyInfoTree>(this.url + 'myInfo/myInfoTree', null)
      .pipe(
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }

  GetTreeInfo$(ein: string): Observable<IMyInfoStaffInfo | null> {
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
          error: (error) => {
            reject({});
          },
        });
    });
  }

  resolveTree(): Promise<IMyInfoTree[]> {
    return new Promise((resolve, reject) => {
      let lanID = this.loginService.currentUser.lanID
        ? this.loginService.currentUser.lanID
        : '';
      this.httpClient
        .post<IMyInfoTree>(this.url + 'myInfo/myInfoTree/' + lanID, null)
        .subscribe({
          next: (data) => {
            //if (this.myInfoTreeStaffs.length > 0) this.myInfoTreeStaffs = [];
            this.tree = [];
            this.tree.push(data);
            this.selectedTree = data;
            console.log('this.myInfoTreeStaffs.', data, this.tree);

            if (data.ein) {
              this.GetInfo(data.ein).then((staffInfo) => {
                console.log(
                  'this.GetStaffInfo(data.ein service',
                  staffInfo,
                  staffInfo._emergency
                );
                this.selectedTreeInfo = staffInfo._info ?? {};
                this.selectedTree_Emergency_Info =
                  staffInfo._emergency ?? {};
                this.selectedTree_Overtime_Info = staffInfo._overtime ?? {};
              });
            }
          },
          error: (error) => {
            reject({});
          },
          complete: () => {
            resolve(this.tree);
          },
        });
    });
  }

  GetInfo(ein: string): Promise<{
    _info: IMyInfoStaffInfo;
    _emergency: IStaffEmergencyContactInfo;
    _overtime: IStaffOvertimeSummary;
  }> {
    return new Promise((resolve, reject) => {
      let _info: IMyInfoStaffInfo;
      let _emergency: IStaffEmergencyContactInfo;
      let _overtime: IStaffOvertimeSummary;

      this.GetTreeInfo$(ein).subscribe({
        next: (info) => {
          if (info) {
            _info = info;
            this.staffService.emergencyContactInfo$(ein).subscribe({
              next: (emergency) => {
                _emergency = emergency[0];
                this.staffService.staffOTSummary$(ein).subscribe({
                  next: (overtime) => {
                    if (overtime) {
                      _overtime = overtime;
                    }
                    resolve({
                      _info: _info,
                      _emergency: _emergency,
                      _overtime: _overtime,
                    });
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
