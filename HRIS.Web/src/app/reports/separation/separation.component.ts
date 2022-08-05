import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { merge, startWith, switchMap, Observable } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { IAgencySeparationChart } from 'src/app/_models/IAgencySeparationChart';
import {
  IAgencySeparationSummary,
  ISeparationTable,
} from 'src/app/_models/IAgencySeparationSummary';
import { IDP, IRC } from 'src/app/_models/IRC_DP';
import { IReportParam } from 'src/app/_models/IReportParam';
import { ChartService } from 'src/app/_services/chart.service';
import { CodeService } from 'src/app/_services/code.service';
import { LoginService } from 'src/app/_services/login.service';
import { StaffService } from 'src/app/_services/staff.service';

@Component({
  selector: 'app-separation',
  templateUrl: './separation.component.html',
  styleUrls: ['./separation.component.scss'],
})
export class SeparationComponent
  extends BaseComponent<ISeparationTable>
  implements AfterViewInit, OnInit
{
  selectedCalendarType: string = 'Calendar';
  calendarType: string[] = ['Calendar', 'Fiscal'];

  agencySeparationParam: IReportParam = {
    reportName: '',
    file: {
      format: '',
    },
    pagination: {
      pageNumber: undefined,
      pageSize: undefined,
      sortColumn: undefined,
      sortOrder: undefined,
      searchTerm: undefined,
    },
    rcDp: {
      isAgencyWise: undefined,
      rcs: undefined,
      dps: undefined,
    },
    code: {
      backupTitles: undefined,
      locations: undefined,
      cSStatuses: undefined,
      titles: undefined,
      lvStatuses: undefined,
    },
  };

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  chartType: ChartType = 'bar';
  chartData: ChartData<'bar'> = { labels: [], datasets: [] };
  chartPlugins: never[] | undefined;
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {},
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  constructor(
    private codeService: CodeService,
    public loginService: LoginService,
    private chartService: ChartService,
    private staffService: StaffService
  ) {
    super();
  }

  ngOnInit(): void {
    this.rcs = this.codeService.rc_dp.RC as IRC[];
    this.dps = this.codeService.rc_dp.DP as IDP[];
    this.filteredDPs = this.dps;
  }

  ngAfterViewInit(): void {
    merge(this.filterAction$)
      .pipe(
        startWith({}),
        switchMap(() => {
          //this.separationChart$.subscribe();
          return this.staffService.agencySeparation$(
            this.agencySeparationParam
          );
        })
      )
      .subscribe({
        next: (_data) => {
          let getData = this.getData$(_data).subscribe({
            next: (_separationTable) => {
              this.data = _separationTable;
            },
          });
          getData.unsubscribe();
        },
      });

    merge(this.filterAction$)
      .pipe(
        startWith({}),
        switchMap(() => {
          //this.separationChart$.subscribe();
          return this.chartService.agencySeparationChart$(
            this.agencySeparationParam
          );
        })
      )
      .subscribe({
        next: (_data) => {
          let __data: number[] = [];
          this.chartData.labels = [];
          this.chartData.datasets = [];

          console.log('chardate', _data);
          Array.isArray(_data)
            ? _data.forEach((chart: IAgencySeparationChart) => {
                if (chart.description !== 'ZZZ') {
                  this.chartData.labels?.push(chart.description);
                  __data.push(chart.total ?? 0);
                }
              })
            : ''; //handle error;

          this.chartData.datasets.push({
            data: __data,
            label: '',
            backgroundColor: this.backgroundColor[0],
            hoverBackgroundColor: this.hoverBackgroundColor[0],
            borderRadius: this.borderRadius,
            hoverBorderColor: this.hoverBackgroundColor[0],
            borderWidth: this.borderWidth,
            borderColor: this.borderColor,
          });

          this.chart?.update();
        },
      });
  }

  private getData$(
    _data: IAgencySeparationSummary[] | null
  ): Observable<ISeparationTable[]> {
    return new Observable((observer) => {
      let _separationTable: ISeparationTable[] = [];

      if (_data && Array.isArray(_data)) {
        this.displayedColumns = ['reason'];

        //prepare -reasons
        _data.forEach((row) => {
          if (row.monthName) {
            if (
              this.displayedColumns.indexOf(
                row.monthName.substr(0, 3).toLowerCase()
              ) === -1
            ) {
              this.displayedColumns.push(
                row.monthName.substr(0, 3).toLowerCase()
              );
            }
          }
          if (row.title) this.header = row.title;

          if (
            _separationTable.length === 0 ||
            (_separationTable.length > 0 &&
              !this.find(_separationTable, row.reasonDesc))
          ) {
            _separationTable.push({
              reason: row.reasonDesc,
              jan: 0,
              feb: 0,
              mar: 0,
              apr: 0,
              may: 0,
              jun: 0,
              jul: 0,
              aug: 0,
              sep: 0,
              oct: 0,
              nov: 0,
              dec: 0,
              grandTotal: 0,
            });
          }
        });

        this.displayedColumns.push('grandTotal');

        //prepare month wise count
        _data.forEach((row) => {
          _separationTable.filter((obj) => {
            if (obj.reason == row.reasonDesc) {
              row.month === 1
                ? (obj.jan += row.count ?? 0)
                : row.month === 2
                ? (obj.feb += row.count ?? 0)
                : row.month === 3
                ? (obj.mar += row.count ?? 0)
                : row.month === 4
                ? (obj.apr += row.count ?? 0)
                : row.month === 5
                ? (obj.may += row.count ?? 0)
                : row.month === 6
                ? (obj.jun += row.count ?? 0)
                : row.month === 7
                ? (obj.jul += row.count ?? 0)
                : row.month === 8
                ? (obj.aug += row.count ?? 0)
                : row.month === 9
                ? (obj.sep += row.count ?? 0)
                : row.month === 10
                ? (obj.oct += row.count ?? 0)
                : row.month === 11
                ? (obj.nov += row.count ?? 0)
                : row.month === 12
                ? (obj.dec += row.count ?? 0)
                : '';
            }
          });
        });

        //prepare row wise grand table
        _separationTable.forEach((row) => {
          if (row.reason === 'ZZZ') {
            row.reason = 'Grand Total';
          }
          row.grandTotal =
            (row.jan ?? 0) +
            (row.feb ?? 0) +
            (row.mar ?? 0) +
            (row.apr ?? 0) +
            (row.may ?? 0) +
            (row.jun ?? 0) +
            (row.jul ?? 0) +
            (row.aug ?? 0) +
            (row.sep ?? 0) +
            (row.oct ?? 0) +
            (row.nov ?? 0) +
            (row.dec ?? 0);
        });

        this.resultsLength = _separationTable.length;
        observer.next(_separationTable);
      }
      observer.error([]);
    });
  }

  find(_separationTable: any[], search?: string): boolean {
    let _result: boolean = false;
    _separationTable.filter((obj) => {
      if (!_result && search && obj.reason == search) {
        _result = true;
      }
    });
    return _result;
  }

  // onRCSelect($event: Event) {
  //   let _selectedDP = this.selectedDP;
  //   let _selectedRC = this.selectedRC;
  //   this.filteredDPs = [];
  //   this.selectedDP = [];

  //   if (_selectedRC.length === 0) {
  //     this.filteredDPs = this.dps;
  //   } else {
  //     this.dps.forEach((x) => {
  //       if (_selectedRC.indexOf(x.rcCode || '') != -1) {
  //         this.filteredDPs.push(x);
  //       } else {
  //         let i = _selectedDP.indexOf(x.dpCode || '');

  //         if (i != -1) {
  //           _selectedDP.splice(i, 1);
  //         }
  //       }
  //     });

  //     _selectedDP.forEach((dp) => this.selectedDP.push(dp));
  //   }
  // }

  onSearch() {
    this.agencySeparationParam.rcDp.rcs = this.selectedRC.join(',');
    this.agencySeparationParam.rcDp.dps = this.selectedDP.join(',');
    this.agencySeparationParam.isCalendarYear =
      this.selectedCalendarType === 'Calendar';
    this.filterSubject.next(this.filterValue);
  }

  onClear() {
    this.selectedCalendarType = 'Calendar';
    this.clear();
    this.filterSubject.next(this.filterValue);
  }
}
