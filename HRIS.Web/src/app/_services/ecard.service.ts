import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { IEcard } from '../_models/IEcard';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EcardService extends BaseService {

  eCards$ = this.httpClient.post<IEcard[]>(this.url + "Ecard/GetChartAsync", null).pipe(
    tap(data => console.log('Ecards >> ', JSON.stringify(data))),
    catchError(err => this.handleError(err)) //error handling
  );

  constructor(private httpClient: HttpClient) {
    super();
  }

}
