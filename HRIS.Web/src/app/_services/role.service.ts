import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../_models/role';
import { tap, catchError } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  roles$ = this.httpClient.get<Role[]>(this.url + "role").pipe(
    //tap(data => console.log('Roles >> ', JSON.stringify(data))), //debug - display in console
    catchError(err => this.handleError(err)) //error handling
  );
}
