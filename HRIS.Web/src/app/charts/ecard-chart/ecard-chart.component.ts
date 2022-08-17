import { Component, ViewChild } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { map } from 'rxjs/operators';

import { IECardChart } from 'src/app/_models/IECard';
import { ICurrentUser } from 'src/app/_models/ICurrentUser';
import { LoginService } from 'src/app/_services/login.service';
import { BaseComponent } from 'src/app/base/base.component';
import { IBarChartData } from 'src/app/_models/IChart';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-ecard-chart',
  templateUrl: './ecard-chart.component.html',
  styleUrls: ['./ecard-chart.component.scss'],
})
export class EcardChartComponent extends BaseComponent<IBarChartData> {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  currentUser: ICurrentUser;

  today = new Date().toLocaleDateString();

  ecardChart$ = this.dataService.eCards$.pipe<IBarChartData>(
    map((ecards) => {
      let data: Array<number> = [];
      let barChartData: ChartData<'bar'> = { labels: [], datasets: [] };
      let barChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        scales: {
          x: {},
          y: {},
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      };

      let barChartType: ChartType = 'bar';

      Array.isArray(ecards)
        ? ecards.forEach((ecard: IECardChart) => {
            barChartData.labels?.push(ecard.labels);
            data.push(ecard.data);
          })
        : ''; //handle error;

      barChartData.datasets.push({
        data: data,
        label: '',
        backgroundColor: this.backgroundColor[0],
        hoverBackgroundColor: this.hoverBackgroundColor[0],
        borderRadius: this.borderRadius,
        hoverBorderColor: this.hoverBackgroundColor[0],
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
    private loginService: LoginService,
    private ngSelect: NgSelectConfig
  ) {
    super();
    this.currentUser = this.loginService.currentUser;
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event?.type, active ? active[0] : undefined);
  }
}
