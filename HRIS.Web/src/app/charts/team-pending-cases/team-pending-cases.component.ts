import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { map } from 'rxjs';
import { IPendingCasesChart } from 'src/app/_models/IPendingCasesChart';
import { ICurrentUser } from 'src/app/_models/ICurrentUser';
import { LoginService } from 'src/app/_services/login.service';
import { BaseComponent } from 'src/app/base/base.component';
import { IBarChartData } from 'src/app/_models/IChart';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-team-pending-cases',
  templateUrl: './team-pending-cases.component.html',
  styleUrls: ['./team-pending-cases.component.scss'],
})
export class PendingCasesComponent
  extends BaseComponent<IBarChartData>
  implements OnInit
{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  currentUser: ICurrentUser;

  tableLabel: string[] = [];

  pendingCases$ = this.dataService.pendingCasesChart$.pipe<IBarChartData>(
    map((rows) => {
      console.log('>', rows);

      let data: Array<number> = [];
      let barChartData: ChartData<'bar'> = { labels: [], datasets: [] };
      let barChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        scales: {
          x: {
            display: false,
          },
          y: {},
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      };

      let barChartType: ChartType = 'bar';

      Array.isArray(rows)
        ? rows.forEach((row: IPendingCasesChart) => {
            console.log(row.groupDescription.indexOf('('));
            barChartData.labels?.push(row.groupDescription);
            data.push(row.count);
          })
        : ''; //handle error;

      barChartData.datasets.push({
        data: data,
        label: '',
        backgroundColor: this.backgroundColor,
        hoverBackgroundColor: this.hoverBackgroundColor,
        borderRadius: this.borderRadius,
        hoverBorderColor: this.hoverBackgroundColor,
        borderWidth: this.borderWidth,
        borderColor: this.borderColor,
      });

      return {
        chartData: barChartData,
        chartOptions: barChartOptions,
        chartType: barChartType,
      } as IBarChartData;
    })
  );

  constructor(
    private dataService: DataService,
    private loginService: LoginService
  ) {
    super();
    this.currentUser = this.loginService.currentUser;
  }

  ngOnInit(): void {}
}
