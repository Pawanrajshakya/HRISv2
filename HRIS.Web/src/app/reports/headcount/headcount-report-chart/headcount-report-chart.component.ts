import { formatNumber } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { merge, startWith, switchMap } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { IHeadcountChartData } from 'src/app/_models/IHeadcountChartData';
import { IRc } from 'src/app/_models/IRcDp';
import { CodeService } from 'src/app/_services/code.service';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-headcount-report-chart',
  templateUrl: './headcount-report-chart.component.html',
  styleUrls: ['./headcount-report-chart.component.scss'],
})
export class HeadcountReportChartComponent
  extends BaseComponent<IHeadcountChartData>
  implements AfterViewInit, OnInit
{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  chartDataHC: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Budgeted Headcount',
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: this.backgroundColor[0],
        pointBackgroundColor: this.hoverBackgroundColor[0],
        pointBorderColor: this.hoverBackgroundColor[0],
        pointHoverBackgroundColor: this.backgroundColor[0],
        pointHoverBorderColor: this.hoverBackgroundColor[0],
        fill: 'origin',
      },
      {
        data: [],
        label: 'Active Staff',
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: this.backgroundColor[1],
        pointBackgroundColor: this.hoverBackgroundColor[1],
        pointBorderColor: this.hoverBackgroundColor[1],
        pointHoverBackgroundColor: this.backgroundColor[1],
        pointHoverBorderColor: this.hoverBackgroundColor[1],
        fill: 'origin',
      },
      {
        data: [],
        label: 'Vacancy',
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: this.backgroundColor[2],
        pointBackgroundColor: this.hoverBackgroundColor[2],
        pointBorderColor: this.hoverBackgroundColor[2],
        pointHoverBackgroundColor: this.backgroundColor[2],
        pointHoverBorderColor: this.hoverBackgroundColor[2],
        fill: 'origin',
      },
    ],
  };

  chartTypeHC: ChartType = 'line';
  chartPluginsHC: never[] | undefined;

  chartOptionsHC: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {},
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  constructor(
    private dataService: DataService,
    private codeService: CodeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.rcs = this.codeService.rc_dp.RC as IRc[];
  }

  ngAfterViewInit(): void {
    merge(this.filterAction$)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.reportParam.rcDp.rcs = this.selectedRC.join(',') ?? '';
          return this.dataService.chart$(this.reportParam);
        })
      )
      .subscribe({
        next: (_data) => {
          this.chartDataHC.labels = [];
          this.chartDataHC.datasets[0].data = [];
          this.chartDataHC.datasets[1].data = [];
          this.chartDataHC.datasets[2].data = [];

          Array.isArray(_data)
            ? _data.forEach((headcountChartData: IHeadcountChartData) => {
                this.chartDataHC.labels?.push(headcountChartData.period);

                this.chartDataHC.datasets[0].data.push(
                  headcountChartData.budgetedHeadcount
                );
                this.chartDataHC.datasets[1].data.push(
                  headcountChartData.activeStaff
                );
                this.chartDataHC.datasets[2].data.push(
                  headcountChartData.vacancy
                );
              })
            : ''; //handle error;

          this.chart?.update();
          this.isLoadingResults = false;
        },
      });
  }



  isString(value: any) {
    return typeof value === 'string' || value instanceof String;
  }

  onSearch() {
    this.filterSubject.next(this.filterValue);
  }

  onClear() {
    this.clear();
    this.filterSubject.next(this.filterValue);
  }
}
