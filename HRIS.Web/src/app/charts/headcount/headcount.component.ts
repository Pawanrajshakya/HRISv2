import { formatNumber } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { map } from 'rxjs';
import { IHeadcountChart, IHeadcountChartData } from 'src/app/_models/headcount';
import { HeadcountService } from 'src/app/_services/headcount.service';

@Component({
  selector: 'app-headcount',
  templateUrl: './headcount.component.html',
  styleUrls: ['./headcount.component.scss']
})
export class HeadcountComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  headcountChart$ = this.headcountService.headcountChart$.pipe<IHeadcountChart>(
    map(_data => {

      // let dataset: any = [];

      let vacancyDataset: any = {
        data: [],
        label: "Vacancy",
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor:  '#f1ab41',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin'
      };

      let budgetedHeadcountDataset: any = {
        data: [],
        label: "Budgeted Headcount",
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor:  '#037bc0',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin'
      };

      let activeStaffDataset: any = {
        data: [],
        label: "Active Staff",
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor:  '#02af57',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
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
      } as IHeadcountChart;
    }));


  constructor(private headcountService: HeadcountService) { }

  ngOnInit(): void {
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
