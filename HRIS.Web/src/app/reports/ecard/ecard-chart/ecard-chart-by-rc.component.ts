import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { merge, startWith, switchMap, Observable } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { ICurrentUser } from 'src/app/_models/ICurrentUser';
import { IECardChart } from 'src/app/_models/IECard';
import { IRc } from 'src/app/_models/IRcDp';
import { CodeService } from 'src/app/_services/code.service';
import { DataService } from 'src/app/_services/data.service';
import { LoginService } from 'src/app/_services/login.service';
import { StaffService } from 'src/app/_services/staff.service';

@Component({
  selector: 'app-ecard-chart-by-rc',
  templateUrl: './ecard-chart-by-rc.component.html',
  styleUrls: ['./ecard-chart-by-rc.component.scss'],
})
export class EcardChartByRcComponent
  extends BaseComponent<IECardChart>
  implements AfterViewInit, OnInit
{
  currentUser: ICurrentUser;

  today = new Date().toLocaleDateString();

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  eCardData: number[] = [];

  chartType: ChartType = 'bar';
  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'ECards',
        backgroundColor: this.backgroundColor[0],
        hoverBackgroundColor: this.hoverBackgroundColor[0],
        borderRadius: this.borderRadius,
        hoverBorderColor: this.hoverBackgroundColor[0],
        borderWidth: this.borderWidth,
        borderColor: this.borderColor,
      },
    ],
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
      },
    },
  };

  constructor(
    private codeService: CodeService,
    public loginService: LoginService,
    private dataService: DataService,
    private staffService: StaffService
  ) {
    super();
    this.currentUser = this.loginService.currentUser;
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
          return this.dataService.ECardChartByRC$(this.reportParam);
        })
      )
      .subscribe({
        next: (_data) => {
          console.log('ecard', _data);
          this.chartData.labels = [];
          this.chartData.datasets[0].data = [];
          Array.isArray(_data)
            ? _data.forEach((ecard: IECardChart) => {
                console.log(ecard);
                this.chartData.labels?.push(ecard.labels);
                this.chartData.datasets[0].data.push(ecard.data);
              })
            : ''; //handle error;

          this.chart?.update();
          this.isLoadingResults = false;
        },
      });
  }

  onSearch() {
    this.reportParam.rcDp.rcs = this.selectedRC.join(',');
    this.filterSubject.next(this.filterValue);
  }

  onClear() {
    this.clear();
    this.filterSubject.next(this.filterValue);
  }
}
