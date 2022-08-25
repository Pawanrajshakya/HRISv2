import { formatNumber } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { merge, startWith, switchMap } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import {
  IEmployeeBehavior,
  IEmployeeBehaviorChart,
  IEmployeeBehaviorParameters,
} from 'src/app/_models/IEmployeeBehavior';
import { CodeService } from 'src/app/_services/code.service';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-customer-service-complaints',
  templateUrl: './customer-service-complaints.component.html',
  styleUrls: ['./customer-service-complaints.component.scss'],
})
export class CustomerServiceComplaintsComponent
  extends BaseComponent<IEmployeeBehaviorChart>
  implements AfterViewInit, OnInit
{
  employeeBehaviorParameters: IEmployeeBehaviorParameters = {};
  title: string = '';
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  chartData: ChartData<'line'> = { labels: [], datasets: [] };
  chartType: ChartType = 'line';
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

  constructor(
    private codeService: CodeService,
    private dataService: DataService
  ) {
    super();

    this.title =
      'Customer Service Complaints/Commendations as of ' +
      new Date().toLocaleDateString();

    this.SetDate();
  }

  private SetDate() {
    let today = new Date();
    today.setMonth(today.getMonth() - 2);
    this.dateFrom = today.toISOString();
    this.dateTo = new Date().toISOString();
  }

  ngOnInit(): void {
    this.employeeBehaviors = this.codeService
      .employeeBehaviors as IEmployeeBehavior[];
  }

  ngAfterViewInit(): void {
    merge(this.filterAction$)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.employeeBehaviorParameters.startDate = this.dateFrom;
          this.employeeBehaviorParameters.endDate = this.dateTo;
          this.employeeBehaviorParameters.isMonthView = true;
          return this.dataService.GetEmployeeBehaviorChart$(
            this.employeeBehaviorParameters
          );
        })
      )
      .subscribe({
        next: (data) => {
          this.chartData.datasets = [];
          this.chartData.labels = [];

          if (Array.isArray(data)) {
            let i = 0;

            data.forEach((row) => {
              if (this.chartData.labels?.indexOf(row.date) === -1) {
                this.chartData.labels?.push(row.date);
              }
            });

            data.forEach((row) => {
              let hasDataset =
                this.chartData.datasets.filter((d) => {
                  return d.label === row.name;
                }).length > 0;

              if (this.chartData.datasets.length === 0 || !hasDataset) {
                let filteredData: number[] = [0, 0, 0, 0];
                data
                  .filter((y) => {
                    return y.name == row.name;
                  })
                  .forEach((z) => {
                    let _index = this.chartData.labels?.indexOf(z.date) ?? 0;
                    filteredData[_index] = z.count;
                  });

                this.chartData.datasets.push({
                  data: filteredData,
                  label: row.name,
                  backgroundColor: 'rgba(1,1,1,.2)',
                  borderColor: this.backgroundColor[i],
                  pointBackgroundColor: this.hoverBackgroundColor[i],
                  pointBorderColor: this.hoverBackgroundColor[i],
                  pointHoverBackgroundColor: this.backgroundColor[i],
                  pointHoverBorderColor: this.hoverBackgroundColor[i],
                  fill: 'origin',
                });
                i++;
              }
            });
          }

          this.chart?.update();
          this.isLoadingResults = false;
        },
      });
  }

  filter(id: number): IEmployeeBehavior[] {
    return this.employeeBehaviors.filter((x) => x.id == id);
  }

  onSearch() {
    this.filterSubject.next(this.filterValue);
  }

  onClear() {
    this.selectedJobCenter = [];
    this.selectedFoodCenter = [];
    this.selectedHRAFacility = [];
    this.selectedRequestStatus = [];
    this.SetDate();
    this.filterSubject.next(this.filterValue);
  }
}
