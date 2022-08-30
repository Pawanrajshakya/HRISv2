import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IMyInfoTree } from '../_models/IMyInfoTree';
import { IStaffInfo } from '../_models/IStaffDetail';
import { ErrorHandlingService } from './error-handling.service';
import { BaseService } from './_base.service';

@Injectable({
  providedIn: 'root',
})
export class MyInfoService extends BaseService {
  //#region Tree
  root: IMyInfoTree[] = [];
  staffInfo: any = null;
  selectedRoot = new EventEmitter<IMyInfoTree>();
  //#endregion

  constructor(
    private httpClient: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) {
    super();
  }

  GetMyInfoTree$(): Observable<IMyInfoTree | null> {
    return this.httpClient
      .post<IMyInfoTree>(this.url + 'myInfo/myInfoTree', null)
      .pipe(
        catchError((err) => this.errorHandlingService.handleError(err)) //error handling
      );
  }

  GetStaffInfo$(ein: string): Observable<IStaffInfo | null> {
    return this.httpClient.get<IStaffInfo>(this.url + 'myInfo/' + ein).pipe(
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
      if (
        this.root === undefined ||
        this.root === null ||
        this.root.length === 0
      ) {
        this.httpClient
          .post<IMyInfoTree>(this.url + 'myInfo/myInfoTree', null)
          .subscribe({
            next: (data) => {
              this.root.push(data);
              if (data.ein) {
                this.GetStaffInfo$(data.ein).subscribe({
                  next: (data) => {
                    this.staffInfo = data;
                  },
                });
              }
            },
            error: (error) => {},
            complete: () => {
              resolve(this.root);
            },
          });
      } else {
        resolve(this.root);
      }
    });
  }
  resolveStaffInfo(): Promise<IStaffInfo> {
    return new Promise((resolve, reject) => {
      if (this.staffInfo === undefined || this.staffInfo === null) {
        this.GetStaffInfo$(this.root[0].ein ?? '').subscribe({
          next: (data) => {
            this.staffInfo = data;
          },
          error: (error) => {},
          complete: () => {
            resolve(this.staffInfo);
          },
        });
      } else {
        resolve(this.staffInfo);
      }
    });
  }
}
