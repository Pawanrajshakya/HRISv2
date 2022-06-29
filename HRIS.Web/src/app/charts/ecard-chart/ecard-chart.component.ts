import { Component, ViewChild } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { map } from 'rxjs/operators';
import { ChartBaseComponent, IBarChartData } from 'src/app/base/chart-base.component';
import { IEcard } from 'src/app/_models/ecard';
import { ICurrentUser } from 'src/app/_models/user';
import { EcardService } from 'src/app/_services/ecard.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-ecard-chart',
  templateUrl: './ecard-chart.component.html',
  styleUrls: ['./ecard-chart.component.scss']
})
export class EcardChartComponent extends ChartBaseComponent {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  currentUser: ICurrentUser;

  today = new Date().toLocaleDateString();

  ecardChart$ = this.ecardService.eCards$.pipe<IBarChartData>(
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

  constructor(private ecardService: EcardService, private userService: UserService, private ngSelect: NgSelectConfig) {
    super();
    this.currentUser = this.userService.currentUser;
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event?.type, active ? active[0] : undefined);
  }

}
