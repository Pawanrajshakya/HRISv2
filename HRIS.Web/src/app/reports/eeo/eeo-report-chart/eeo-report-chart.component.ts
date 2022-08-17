import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { IPieChartData } from 'src/app/_models/IChart';
import { DataService } from 'src/app/_services/data.service';
import { map } from 'rxjs';
import { IEEOChartDto } from 'src/app/_models/IEEO';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-eeo-report-chart',
  templateUrl: './eeo-report-chart.component.html',
  styleUrls: ['./eeo-report-chart.component.scss'],
})
export class EeoReportChartComponent
  extends BaseComponent<IPieChartData>
  implements OnInit
{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  _chartDataLabelDB: string[] = [];
  _chartDataLabelGB: string[] = [];

  _chartDataDatasetsDB: any = [];
  _chartDataDatasetsGB: any = [];

  dbTitle: string = '';
  gbTitle: string = '';

  constructor(private dataService: DataService) {
    super();
  }

  ngOnInit(): void {}

  eeoAgencyDemographicBreakdownChart$ =
    this.dataService.eeoAgencyDemographicChart$.pipe<IPieChartData>(
      map((rows) => {
        let _data: number[] = [];

        if (Array.isArray(rows)) {
          rows.forEach((row: IEEOChartDto) => {
            this._chartDataLabelDB.push(row.labels + ' ' + row.data ?? '');
            _data.push(row.data ?? 0);
            this.dbTitle = row.title ?? '';
          });
        }

        let chartData: ChartData<'pie'> = {
          labels: this._chartDataLabelDB,
          datasets: [
            {
              data: _data,
              backgroundColor: this.backgroundColor,
              hoverBackgroundColor: this.hoverBackgroundColor,
              borderColor: this.borderColor,
              borderWidth: this.borderWidth,
              hoverBorderColor: this.hoverBackgroundColor,
            },
          ],
        };

        let chartOptions: ChartConfiguration['options'] = {
          responsive: true,
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
            },
          },
        };

        let chartType: ChartType = 'pie';

        return {
          chartData: chartData,
          chartOptions: chartOptions,
          chartType: chartType,
        } as IPieChartData;
      })
    );

  eeoGenderBreakdownChart$ =
    this.dataService.eeoGenderChart$.pipe<IPieChartData>(
      map((rows) => {
        let _data: number[] = [];

        if (Array.isArray(rows)) {
          rows.forEach((row: IEEOChartDto) => {
            this._chartDataLabelGB.push(row.labels + ' ' + row.data ?? '');
            _data.push(row.data ?? 0);
            this.gbTitle = row.title ?? '';
          });
        }

        let chartData: ChartData<'pie'> = {
          labels: this._chartDataLabelGB,
          datasets: [
            {
              data: _data,
              backgroundColor: this.backgroundColor,
              hoverBackgroundColor: this.hoverBackgroundColor,
              borderColor: this.borderColor,
              borderWidth: this.borderWidth,
              hoverBorderColor: this.hoverBackgroundColor,
            },
          ],
        };

        let chartOptions: ChartConfiguration['options'] = {
          responsive: true,
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
            },
          },
        };

        let chartType: ChartType = 'pie';

        return {
          chartData: chartData,
          chartOptions: chartOptions,
          chartType: chartType,
        } as IPieChartData;
      })
    );
}
