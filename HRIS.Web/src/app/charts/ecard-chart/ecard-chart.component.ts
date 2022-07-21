import { Component, ViewChild } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { map } from 'rxjs/operators';
import { ChartBaseComponent, IBarChartData } from 'src/app/base/chart-base.component';
import { IEcard } from 'src/app/_models/IEcard';
import { ICurrentUser } from "src/app/_models/ICurrentUser";
import { ChartService } from 'src/app/_services/chart.service';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-ecard-chart',
  templateUrl: './ecard-chart.component.html',
  styleUrls: ['./ecard-chart.component.scss']
})
export class EcardChartComponent extends ChartBaseComponent {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  currentUser: ICurrentUser;

  today = new Date().toLocaleDateString();

  ecardChart$ = this.chartService.eCards$.pipe<IBarChartData>(
    map(ecards => {

      let data: Array<number> = [];
      let barChartData: ChartData<'bar'> = { labels: [], datasets: [] };
      let barChartOptions: ChartConfiguration['options'] =
      {
        responsive: true,
        scales: {
          x: {
          },
          y: {
          }
        },
        plugins: {
          legend: {
            display: false,
          }
        }
      };

      let barChartType: ChartType = 'bar';

      Array.isArray(ecards) ? ecards.forEach((ecard: IEcard) => {
        barChartData.labels?.push(ecard.labels);
        data.push(ecard.data);
      }) : "";//handle error;

      barChartData.datasets.push({
        data: data,
        label: '',
        backgroundColor: this.backgroundColor[0],
        hoverBackgroundColor: this.hoverBackgroundColor[0],
        borderRadius: this.borderRadius,
        hoverBorderColor: this.hoverBackgroundColor[0],
        borderWidth: this.borderWidth,
        borderColor: this.borderColor
      });

      return {
        chartData: barChartData,
        chartOptions: barChartOptions,
        chartType: barChartType
      } as IBarChartData;
    }));

  constructor(private chartService: ChartService
    , private loginService: LoginService
    , private ngSelect: NgSelectConfig) {
    super();
    this.currentUser = this.loginService.currentUser;
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event?.type, active ? active[0] : undefined);
  }

}
