import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { merge, startWith, switchMap } from 'rxjs';
import { getFullYear } from 'ngx-bootstrap/chronos';
import { BaseComponent } from 'src/app/base/base.component';
import { DisciplinaryService } from 'src/app/_services/disciplinary.service';
import { DataService } from 'src/app/_services/data.service';
import { IPendingCasesChart } from 'src/app/_models/IPendingCasesChart';

@Component({
  selector: 'app-pending-cases-chart',
  templateUrl: './pending-cases-chart.component.html',
  styleUrls: ['./pending-cases-chart.component.scss'],
})
export class PendingCasesChartComponent
  extends BaseComponent<IPendingCasesChart>
  implements OnInit, AfterViewInit
{
  @ViewChild(BaseChartDirective) Chart: BaseChartDirective | undefined;

  //#region  Case Received & Closed
  title: string = '';
  chartType: ChartType = 'bar';
  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };
  chartPlugins: never[] | undefined;
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {display: false},
      y: {},
    },
    plugins: {
      legend: {
        display: false
      },
    },
  };
  // //#endregion

  constructor(
    private disciplinaryService: DisciplinaryService,
    private dataService: DataService
  ) {
    super();
    this.title = 'Cases Pending Disciplinary Action as of Today';
  }

  ngOnInit(): void {
    this.filterSubject.next(this.filterValue);
    this.disciplinaryService.selectedRCs.subscribe({
      next: (rcs: string[]) => {
        this.selectedRC = rcs;
        this.filterSubject.next(this.filterValue);
      },
    });
  }

  ngAfterViewInit(): void {
    merge(this.filterAction$)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.dataService.GetPendingCasesChart$(
            this.selectedRC.join(',') ?? ''
          );
        })
      )
      .subscribe({
        next: (_data) => {

          this.chartData.labels = [];
          this.chartData.datasets = [];

          let data: Array<number> = [];

          if (Array.isArray(_data)) {
            _data.forEach((row: IPendingCasesChart) => {
              this.chartData.labels?.push(row.groupDescription);
              data.push(row.count);
            });

            this.chartData.datasets.push({
              data: data,
              label: '',
              backgroundColor: this.backgroundColor,
              hoverBackgroundColor: this.hoverBackgroundColor,
              borderRadius: this.borderRadius,
              hoverBorderColor: this.hoverBackgroundColor,
              borderWidth: this.borderWidth,
              borderColor: this.borderColor,
            });
          }
          this.Chart?.update();
          this.isLoadingResults = false;
        },
      });
  }
}
