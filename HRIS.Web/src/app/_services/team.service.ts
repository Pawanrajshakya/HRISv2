import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { ITopInfractionsChart } from "../_models/ITopInfractionsChart";
import { ICasesCountByYear } from "../_models/ICasesCountByYear";
import { IPendingCasesChart } from "../_models/IPendingCasesChart";
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends BaseService {

  pendingCasesChart$ = this.httpClient.get<IPendingCasesChart[]>(this.url + "Team/PendingCasesChartAsync").pipe(
    tap(data => console.log('PendingCasesChartAsync >> ', JSON.stringify(data))),
    catchError(err => this.handleError(err)) //error handling
  );

  casesCountByYearChart$  = this.httpClient.get<ICasesCountByYear[]>(this.url + "Team/CaseCountByYearChartAsync").pipe(
    tap(data => console.log('CaseCountByYearChartAsync >> ', JSON.stringify(data))),
    catchError(err => this.handleError(err)) //error handling
  );

  topInfractionsChart$  = this.httpClient.get<ITopInfractionsChart[]>(this.url + "Team/TopInfractionsChartAsync").pipe(
    tap(data => console.log('TopInfractionsChartAsync >> ', JSON.stringify(data))),
    catchError(err => this.handleError(err)) //error handling
  );


  constructor(private httpClient: HttpClient) {
    super();
  }
}
