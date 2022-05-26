import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { IPendingCasesChart } from '../_models/team';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends BaseService {

  pendingCasesChart$ = this.httpClient.get<IPendingCasesChart[]>(this.url + "Team/PendingCasesChartAsync").pipe(
    tap(data => console.log('PendingCasesChartAsync >> ', JSON.stringify(data))),
    catchError(err => this.handleError(err)) //error handling
  );

  constructor(private httpClient: HttpClient) {
    super();
  }
}
