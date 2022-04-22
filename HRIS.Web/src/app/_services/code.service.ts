import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { IDP } from '../_models/IDP';
import { IRC } from '../_models/IRC';
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
  }
}
