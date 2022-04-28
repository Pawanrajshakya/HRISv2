import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { IGroup } from '../_models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  groups$ = this.httpClient.get<IGroup[]>(this.url + "group").pipe(
    //tap(data => console.log('Groups >> ', JSON.stringify(data))), //debug - display in console
    catchError(err => this.handleError(err)) //error handling
  );
}
