import { formatNumber } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ChartData, ChartType, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { map } from 'rxjs';
import { ChartBaseComponent , ILineChartData} from 'src/app/base/chart-base.component';
import { IHeadcountChartData } from 'src/app/_models/IHeadcountChartData';
import { HeadcountService } from 'src/app/_services/headcount.service';

@Component({
  selector: 'app-headcount',
  templateUrl: './headcount.component.html',
  styleUrls: ['./headcount.component.scss']
})
export class HeadcountComponent extends ChartBaseComponent {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  headcountChart$ = this.headcountService.headcountChart$.pipe<ILineChartData>(
    map(_data => {

      // let dataset: any = [];

      let vacancyDataset: any = {
        data: [],
        label: "Vacancy",
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: this.backgroundColor[2],
        pointBackgroundColor: this.hoverBackgroundColor[2],
        pointBorderColor: this.hoverBackgroundColor[2],
        pointHoverBackgroundColor: this.backgroundColor[2],
        pointHoverBorderColor: this.hoverBackgroundColor[2],
        fill: 'origin'
      };

      let budgetedHeadcountDataset: any = {
        data: [],
        label: "Budgeted Headcount",
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: this.backgroundColor[0],
        pointBackgroundColor: this.hoverBackgroundColor[0],
        pointBorderColor: this.hoverBackgroundColor[0],
        pointHoverBackgroundColor: this.backgroundColor[0],
        pointHoverBorderColor: this.hoverBackgroundColor[0],
        fill: 'origin'
      };

      let activeStaffDataset: any = {
        data: [],
        label: "Active Staff",
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: this.backgroundColor[1],
        pointBackgroundColor: this.hoverBackgroundColor[1],
        pointBorderColor: this.hoverBackgroundColor[1],
        pointHoverBackgroundColor: this.backgroundColor[1],
        pointHoverBorderColor: this.hoverBackgroundColor[1],
        fill: 'origin'
      };

      let chartData: ChartData<'line'> = { labels: [], datasets: [] };

      let chartOptions: ChartConfiguration['options'] =
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

      let chartType: ChartType = 'line';

      Array.isArray(_data) ? _data.forEach((headcountChartData: IHeadcountChartData) => {
        chartData.labels?.push(headcountChartData.period);

        vacancyDataset.data.push(headcountChartData.vacancy);
        budgetedHeadcountDataset.data.push(headcountChartData.budgetedHeadcount);
        activeStaffDataset.data.push(headcountChartData.activeStaff);
      }) : "";//handle error;

      chartData.datasets.push(budgetedHeadcountDataset);
      chartData.datasets.push(activeStaffDataset);
      chartData.datasets.push(vacancyDataset);

      return {
        chartData: chartData,
        chartOptions: chartOptions,
        chartType: chartType
      } as ILineChartData;
    }));


  constructor(private headcountService: HeadcountService) {
    super();
  }

  convertToNumberFormat(value: any) {
    if (Number(value) !== NaN)
      return formatNumber(Number(value), 'en-US', '1.0-0')

    return formatNumber(Number(value.ToString()), 'en-US', '1.0-0')
  }

  isString(value: any) {
    return typeof value === 'string' || value instanceof String;
  }

}
