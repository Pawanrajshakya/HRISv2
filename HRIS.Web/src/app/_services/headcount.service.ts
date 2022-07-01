import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { IHeadcountChartData } from '../_models/IHeadcountChartData';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class HeadcountService extends BaseService {

  headcountChart$ = this.httpClient.post<IHeadcountChartData[]>(this.url + "Headcount/GetChartAsync", null).pipe(
    tap(data => console.log('Headcount/GetChartAsync >> ', JSON.stringify(data))),
    catchError(err => this.handleError(err)) //error handling
  );


  constructor(private httpClient: HttpClient) {
    super();
   }
}
