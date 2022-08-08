import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BaseComponent } from 'src/app/base/base.component';
import { IBudgetedOT } from 'src/app/_models/IBudgetedOT';
import { IRC } from 'src/app/_models/IRC_DP';
import { ChartService } from 'src/app/_services/chart.service';
import { CodeService } from 'src/app/_services/code.service';
import { LoginService } from 'src/app/_services/login.service';
import { merge, startWith, switchMap, Observable } from 'rxjs';

@Component({
  selector: 'app-overtime-chart',
  templateUrl: './overtime-chart.component.html',
  styleUrls: ['./overtime-chart.component.scss'],
})
export class OvertimeChartComponent
  extends BaseComponent<IBudgetedOT>
  implements AfterViewInit, OnInit
{
  @ViewChild(BaseChartDirective) Chart: BaseChartDirective | undefined;

  year: string = 'P';
  isLoadingResultsAOT: boolean = true;

  chartTypeBOT: ChartType = 'bar';
  chartDataBOT: ChartData<'bar'> = { labels: [], datasets: [] };
  chartPluginsBOT: never[] | undefined;
  chartOptionsBOT: ChartConfiguration['options'] = {
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

  chartTypeAOT: ChartType = 'bar';
  chartDataAOT: ChartData<'bar'> = { labels: [], datasets: [] };
  chartPluginsAOT: never[] | undefined;
  chartOptionsAOT: ChartConfiguration['options'] = {
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
    private codeService: CodeService,
    public loginService: LoginService,
    private chartService: ChartService
  ) {
    super();
  }

  ngOnInit(): void {
    this.rcs = this.codeService.rc_dp.RC as IRC[];
  }

  ngAfterViewInit(): void {
    merge(this.filterAction$)
      .pipe(
        startWith({}),
        switchMap(() => {
          console.log(this.selectedRC.join(','));
          //this.separationChart$.subscribe();
          this.isLoadingResults = true;
          return this.chartService.budgetedOTChart$(
            this.selectedRC.join('|') ?? '',
            this.year
          );
        })
      )
      .subscribe({
        next: (_data) => {
          let _budgetedOTData: number[] = [];
          let _budgetedOTDataLabel: string = 'Budget OT';
          let _actualOTData: number[] = [];
          let _actualOTDataLabel: string = 'Actual OT';
          this.chartDataBOT.labels = [];
          this.chartDataBOT.datasets = [];

          console.log('chardate', _data);
          Array.isArray(_data)
            ? _data.forEach((chart: IBudgetedOT) => {
                if (
                  this.chartDataBOT.labels?.indexOf(chart.dbDescription) === -1
                ) {
                  _budgetedOTData.push(chart.dbValue);
                  this.chartDataBOT.labels?.push(chart.dbDescription);
                  _budgetedOTDataLabel = chart.type;
                } else {
                  _actualOTData.push(chart.dbValue);
                  _actualOTDataLabel = chart.type;
                }
              })
            : ''; //handle error;

          this.chartDataBOT.datasets.push({
            data: _budgetedOTData,
            label: _budgetedOTDataLabel,
            backgroundColor: this.backgroundColor[0],
            hoverBackgroundColor: this.hoverBackgroundColor[0],
            borderRadius: this.borderRadius,
            hoverBorderColor: this.hoverBackgroundColor[0],
            borderWidth: this.borderWidth,
            borderColor: this.borderColor,
          });

          this.chartDataBOT.datasets.push({
            data: _actualOTData,
            label: _actualOTDataLabel,
            backgroundColor: this.backgroundColor[1],
            hoverBackgroundColor: this.hoverBackgroundColor[1],
            borderRadius: this.borderRadius,
            hoverBorderColor: this.hoverBackgroundColor[1],
            borderWidth: this.borderWidth,
            borderColor: this.borderColor,
          });

          this.Chart?.update();
          this.isLoadingResults = false;
        },
      });

    merge(this.filterAction$)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResultsAOT = true;
          return this.chartService.actualOTChart$(
            this.selectedRC.join('|') ?? ''
          );
        })
      )
      .subscribe({
        next: (_data) => {
          let _budgetedOTData: number[] = [];
          let _budgetedOTDataLabel: string = 'Actual Previous';
          let _actualOTData: number[] = [];
          let _actualOTDataLabel: string = 'Actual Current';
          this.chartDataAOT.labels = [];
          this.chartDataAOT.datasets = [];

          console.log('chardate', _data);
          Array.isArray(_data)
            ? _data.forEach((chart: IBudgetedOT) => {
                if (
                  this.chartDataAOT.labels?.indexOf(
                    chart.dbDescription.substring(0, 3)
                  ) === -1
                ) {
                  _budgetedOTData.push(chart.dbValue);
                  this.chartDataAOT.labels?.push(
                    chart.dbDescription.substring(0, 3)
                  );
                  _budgetedOTDataLabel = chart.type;
                } else {
                  _actualOTData.push(chart.dbValue);
                  _actualOTDataLabel = chart.type;
                }
              })
            : ''; //handle error;

          this.chartDataAOT.datasets.push({
            data: _budgetedOTData,
            label: _budgetedOTDataLabel,
            backgroundColor: this.backgroundColor[0],
            hoverBackgroundColor: this.hoverBackgroundColor[0],
            borderRadius: this.borderRadius,
            hoverBorderColor: this.hoverBackgroundColor[0],
            borderWidth: this.borderWidth,
            borderColor: this.borderColor,
          });

          this.chartDataAOT.datasets.push({
            data: _actualOTData,
            label: _actualOTDataLabel,
            backgroundColor: this.backgroundColor[1],
            hoverBackgroundColor: this.hoverBackgroundColor[1],
            borderRadius: this.borderRadius,
            hoverBorderColor: this.hoverBackgroundColor[1],
            borderWidth: this.borderWidth,
            borderColor: this.borderColor,
          });

          this.Chart?.update();
          this.isLoadingResultsAOT = false;
        },
      });
  }

  onBudgetedOTChartClick({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
    this.year = this.year === 'P' ? 'C' : 'P';
    this.filterSubject.next(this.filterValue);
  }

  onSearch() {
    this.filterSubject.next(this.filterValue);
  }

  onClear() {
    this.year = 'P';
    this.clear();
    this.filterSubject.next(this.filterValue);
  }
}
