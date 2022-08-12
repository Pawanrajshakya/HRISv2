import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BsModalService } from 'ngx-bootstrap/modal';
import { merge, startWith, switchMap } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { IOvertimeCitytimeReport } from 'src/app/_models/IOvertimeCitytimeReport';
import { IDp, IRc } from 'src/app/_models/IRcDp';
import { Reports } from 'src/app/_models/Reports.enum';
import { CodeService } from 'src/app/_services/code.service';
import { LoginService } from 'src/app/_services/login.service';
import { OvertimeService } from 'src/app/_services/overtime.service';

@Component({
  selector: 'app-citytime-otreport',
  templateUrl: './citytime-ot-report.component.html',
  styleUrls: ['./citytime-ot-report.component.scss'],
})
export class CitytimeOTReportComponent
  extends BaseComponent<IOvertimeCitytimeReport>
  implements AfterViewInit, OnInit
{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  voluntaryDataset: any = {
    data: [],
    label: 'Voluntary',
    backgroundColor: this.transparentBackgroundColor[0],
    borderColor: this.backgroundColor[0],
    pointBackgroundColor: this.hoverBackgroundColor[0],
    pointBorderColor: this.hoverBackgroundColor[0],
    pointHoverBackgroundColor: this.backgroundColor[0],
    pointHoverBorderColor: this.hoverBackgroundColor[0],
    fill: 'origin',
  };

  inVoluntaryDataset: any = {
    data: [],
    label: 'Involuntary',
    backgroundColor: this.transparentBackgroundColor[1],
    borderColor: this.backgroundColor[1],
    pointBackgroundColor: this.hoverBackgroundColor[1],
    pointBorderColor: this.hoverBackgroundColor[1],
    pointHoverBackgroundColor: this.backgroundColor[1],
    pointHoverBorderColor: this.hoverBackgroundColor[1],
    fill: 'origin',
  };

  chartTypeOT: ChartType = 'line';
  chartDataOT: ChartData<'line'> = { labels: [], datasets: [] };
  chartPluginsOT: never[] | undefined;
  chartOptionsOT: ChartConfiguration['options'] = {
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

  date: { value: number; text: string }[] = [];
  selectedDateFrom: any;
  selectedDateTo: any;

  constructor(
    public loginService: LoginService,
    private codeService: CodeService,
    private overtimeService: OvertimeService,
    private modalService: BsModalService
  ) {
    super();
  }

  ngOnInit(): void {
    this.rcs = this.codeService.rc_dp.RC as IRc[];
    this.dps = this.codeService.rc_dp.DP as IDp[];
  }

  ngAfterViewInit(): void {
    merge(this.filterAction$)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.overtimeService.overtimeCitytimeReport$(this.reportParam);
        })
      )
      .subscribe({
        next: (_data) => {
          this.chartDataOT.labels = [];
          //this.date = [];
          this.voluntaryDataset.data = [];
          this.inVoluntaryDataset.data = [];

          Array.isArray(_data)
            ? _data.forEach((_data: IOvertimeCitytimeReport) => {
                if (
                  this.date.filter((x) => x.text === _data.date).length === 0
                ) {
                  this.date.push({
                    value: _data.rowNum ?? 0,
                    text: _data.date ?? '',
                  });
                }
                this.chartDataOT.labels?.push(_data.date);
                this.voluntaryDataset.data.push(_data.voluntary);
                this.inVoluntaryDataset.data.push(_data.involuntary);
              })
            : ''; //handle error;

          this.chartDataOT.datasets.push(this.voluntaryDataset);
          this.chartDataOT.datasets.push(this.inVoluntaryDataset);

          console.log(this.chartDataOT);

          this.chart?.update();
          this.isLoadingResults = false;
        },
      });
  }

  onSearch() {
    this.reportParam.rcDp.rcs = this.selectedRC.join(',');
    this.reportParam.rcDp.dps = this.selectedDP.join(',');
    this.reportParam.minDate = this.selectedDateFrom ?? 0;
    this.reportParam.maxDate = this.selectedDateTo ?? 0;
    this.filterSubject.next(this.filterValue);
  }

  onClear() {
    this.clear();

    this.selectedDateFrom = undefined;
    this.selectedDateTo = undefined;
    this.reportParam.minDate = 0;
    this.reportParam.maxDate = 0;
    this.filterSubject.next(this.filterValue);
  }

  onExport() {
    this.download(this.modalService, Reports[10]);
  }
}
