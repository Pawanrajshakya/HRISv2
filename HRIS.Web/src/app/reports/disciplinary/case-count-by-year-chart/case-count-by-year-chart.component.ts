import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { merge, startWith, switchMap } from 'rxjs';
import { getFullYear } from 'ngx-bootstrap/chronos';
import { BaseComponent } from 'src/app/base/base.component';
import { DisciplinaryService } from 'src/app/_services/disciplinary.service';
import { DataService } from 'src/app/_services/data.service';
import { ICasesCountByYear } from 'src/app/_models/ICasesCountByYear';

@Component({
  selector: 'app-case-count-by-year-chart',
  templateUrl: './case-count-by-year-chart.component.html',
  styleUrls: ['./case-count-by-year-chart.component.scss'],
})
export class CaseCountByYearChartComponent
  extends BaseComponent<ICasesCountByYear>
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
      x: {},
      y: {},
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'center',
      },
    },
  };
  // //#endregion

  constructor(
    private disciplinaryService: DisciplinaryService,
    private dataService: DataService
  ) {
    super();

    const _date = new Date(getFullYear(new Date()), 0, 1);
    this.title =
      'Disciplinary Cases Received and Closed Year-to-Date (' +
      _date.toLocaleDateString() +
      ' - ' +
      new Date().toLocaleDateString() +
      ')';
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
          return this.dataService.GetCasesCountByYearChart$(
            this.selectedRC.join(',') ?? ''
          );
        })
      )
      .subscribe({
        next: (_data) => {

          let _label: string[] = [];

          this.chartData.labels = [];
          this.chartData.datasets = [];

          if (Array.isArray(_data)) {
            _data.forEach((row: ICasesCountByYear) => {
              let i = this.chartData.labels?.indexOf(row.flag);
              if (i && i < 0) {
                this.chartData.labels?.push(row.flag);
              }
              if (_label.indexOf(row.year) < 0) {
                _label.push(row.year);
              }
            });

            let _index = -1;
            _label.forEach((x) => {
              _index += 1;
              this.chartData.datasets.push({
                data: [],
                label: x,
                backgroundColor: this.backgroundColor[_index],
                hoverBackgroundColor: this.hoverBackgroundColor[_index],
                hoverBorderColor: this.hoverBackgroundColor[_index],
                borderRadius: this.borderRadius,
                borderWidth: this.borderWidth,
                borderColor: this.borderColor,
              });
            });

            _data.forEach((row: ICasesCountByYear) => {
              let y = _label.indexOf(row.year);
              this.chartData.datasets[y].data.push(row.count);
            });
          }
          this.Chart?.update();
          this.isLoadingResults = false;
        },
      });
  }
}
