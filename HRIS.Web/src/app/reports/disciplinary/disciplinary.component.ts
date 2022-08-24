import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { merge, startWith, switchMap, Observable, observable } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { IPieChartData } from 'src/app/_models/IChart';
import { IRc } from 'src/app/_models/IRcDp';
import { CodeService } from 'src/app/_services/code.service';
import { DataService } from 'src/app/_services/data.service';
import { LoginService } from 'src/app/_services/login.service';
import { getFullYear } from 'ngx-bootstrap/chronos';
import {
  ICasesCountByYear,
  IDisciplinary,
} from 'src/app/_models/ICasesCountByYear';
import { ITopInfractionsChart } from 'src/app/_models/ITopInfractionsChart';
import { DisciplinaryService } from 'src/app/_services/disciplinary.service';

@Component({
  selector: 'app-disciplinary',
  templateUrl: './disciplinary.component.html',
  styleUrls: ['./disciplinary.component.scss'],
})
export class DisciplinaryComponent
  extends BaseComponent<any>
  implements OnInit
{
  // @ViewChild(BaseChartDirective) Chart: BaseChartDirective | undefined;

  // _date = new Date(getFullYear(new Date()), 0, 1);

  // chartData: ChartData[] = [];
  // //#region  Top Five Infraction
  // isLoadingResults1: boolean = true;
  // titleTFI: string =
  //   'Summary of the Top Five Infractions in DSS-HRA-DHS received Year-To-Date (' +
  //   this._date.toLocaleDateString() +
  //   ' - ' +
  //   new Date().toLocaleDateString() +
  //   ')';
  // chartTypeTFI: ChartType = 'pie';
  // chartDataTFI: ChartData<'pie'> =
  // {
  //   labels: [],
  //   datasets: [
  //     {
  //       data: [],
  //       backgroundColor: this.backgroundColor,
  //       hoverBackgroundColor: this.hoverBackgroundColor,
  //       borderColor: this.borderColor,
  //       borderWidth: this.borderWidth,
  //       hoverBorderColor: this.hoverBackgroundColor,
  //     },
  //   ],
  // };
  // chartPluginsTFI: never[] | undefined;
  // chartOptionsTFI: ChartConfiguration['options'] = {
  //   responsive: true,
  //   scales: {
  //     x: { display: false },
  //     y: { display: false },
  //   },
  //   plugins: {
  //     legend: {
  //       display: true,
  //       position: 'bottom',
  //       align: 'end',
  //     },
  //   },
  // };
  // //#endregion

  // //#region  Case Received & Closed
  // isLoadingResults2: boolean = true;
  // public titleCRC: string =
  //   'Disciplinary Cases Received and Closed Year-to-Date (' +
  //   this._date.toLocaleDateString() +
  //   ' - ' +
  //   new Date().toLocaleDateString() +
  //   ')';
  // chartTypeCRC: ChartType = 'bar';
  // chartDataCRC: ChartData<'bar'> = {
  //   labels: [],
  //   datasets: [],
  // };
  // chartPluginsCRC: never[] | undefined;
  // chartOptionsCRC: ChartConfiguration['options'] = {
  //   responsive: true,
  //   scales: {
  //     x: {},
  //     y: {},
  //   },
  //   plugins: {
  //     legend: {
  //       display: true,
  //       position: 'bottom',
  //       align: 'end',
  //     },
  //   },
  // };
  // //#endregion

  // //#region  Pending Cases

  // //#endregion

  constructor(
    private codeService: CodeService,
    public loginService: LoginService,
    private disciplinaryService: DisciplinaryService
  ) {
    super();
  }

  ngOnInit(): void {
    this.rcs = this.codeService.rc_dp.RC as IRc[];
  }

  // ngAfterViewInit(): void {
  //   merge(this.filterAction$)
  //     .pipe(
  //       startWith({}),
  //       switchMap(() => {
  //         this.isLoadingResults2 = true;
  //         return this.getData$();
  //       })
  //     )
  //     .subscribe({
  //       next: (rows) => {
  //         // this.chartDataCRC.labels?.push('A');
  //         // this.chartDataCRC.labels?.push('B');
  //         // this.chartDataCRC.datasets?.push({ data: [1, 2], label: 'A' });
  //         // this.chartDataCRC.datasets?.push({ data: [4, 6], label: 'B' });
  //         console.log('2', rows);

  //         let _chartDataLabel: string[] = [];
  //         let _label: string[] = [];

  //         if (Array.isArray(rows.casesCountByYear)) {
  //           rows.casesCountByYear.forEach((row: ICasesCountByYear) => {
  //             let i = this.chartDataCRC.labels?.indexOf(row.flag);
  //             if (i && i < 0) {
  //               this.chartDataCRC.labels?.push(row.flag);
  //             }

  //             if (_label.indexOf(row.year) < 0) {
  //               _label.push(row.year);
  //             }
  //           });

  //           let _index = -1;

  //           _label.forEach((x) => {
  //             _index += 1;
  //             this.chartDataCRC.datasets.push({
  //               data: [],
  //               label: x,
  //               backgroundColor: this.backgroundColor[_index],
  //               hoverBackgroundColor: this.hoverBackgroundColor[_index],
  //               hoverBorderColor: this.hoverBackgroundColor[_index],
  //               borderRadius: this.borderRadius,
  //               borderWidth: this.borderWidth,
  //               borderColor: this.borderColor,
  //             });
  //           });

  //           rows.casesCountByYear.forEach((row: ICasesCountByYear) => {
  //             let y = _label.indexOf(row.year);
  //             this.chartDataCRC.datasets[y].data.push(row.count);
  //           });
  //         }

  //         //this.chartDataCRC.labels = _chartDataLabel;

  //         this.chartDataTFI.labels = [];
  //         this.chartDataTFI.datasets[0].data = [];

  //         Array.isArray(rows.topInfractionsChart)
  //           ? rows.topInfractionsChart.forEach((_row) => {
  //               console.log('_row',_row);
  //               this.chartDataTFI.labels?.push(
  //                 _row.groupDescription +
  //                   ' ' +
  //                   _row.percentage +
  //                   '%        ' +
  //                   _row.count
  //               );
  //               this.chartDataTFI.datasets[0].data.push(_row.count);
  //             })
  //           : '';

  //         console.log('>', this.chartDataCRC);
  //         this.Chart?.update();
  //         this.isLoadingResults2 = false;
  //       },
  //     });

  // merge(this.filterAction$)
  //   .pipe(
  //     startWith({}),
  //     switchMap(() => {
  //       this.isLoadingResults1 = true;
  //       return this.dataService.GetTopInfractionsChart$(
  //         this.selectedRC.join(',') ?? ''
  //       );
  //     })
  //   )
  //   .subscribe({
  //     next: (_data) => {
  //       console.log('1', _data);
  //       this.chartDataTFI.labels = [];
  //       this.chartDataTFI.datasets[0].data = [];
  //       Array.isArray(_data)
  //         ? _data.forEach((_row) => {
  //             console.log(_row);
  //             this.chartDataTFI.labels?.push(
  //               _row.groupDescription +
  //                 ' ' +
  //                 _row.percentage +
  //                 '%        ' +
  //                 _row.count
  //             );
  //             this.chartDataTFI.datasets[0].data.push(_row.count);
  //           })
  //         : ''; //handle error;
  //       this.Chart?.update();
  //       this.isLoadingResults1 = false;
  //     },
  //   });
  // }

  // getData$(): Observable<IDisciplinary> {
  //   return new Observable((observer) => {
  //     let _disciplinary: IDisciplinary = {};

  //     let _ICasesCountByYear: ICasesCountByYear[];
  //     let _ITopInfractionsChart: ITopInfractionsChart[];
  //     this.isLoadingResults = true;
  //     this.dataService
  //       .GetCasesCountByYearChart$(this.selectedRC.join(',') ?? '')
  //       .subscribe({
  //         next: (rows) => {
  //           console.log('_disciplinary1', rows);

  //           _disciplinary.casesCountByYear = rows as ICasesCountByYear[];

  //           this.dataService
  //             .GetTopInfractionsChart$(this.selectedRC.join(',') ?? '')
  //             .subscribe({
  //               next: (rows) => {
  //                 _disciplinary.topInfractionsChart =
  //                   rows as ITopInfractionsChart[];

  //                 observer.next(_disciplinary);
  //               },
  //             });
  //         },
  //       });

  //     console.log('_disciplinary', _disciplinary);
  //   });
  // }

  onSearch() {
    this.disciplinaryService.selectedRCs.emit(this.selectedRC);
    //this.reportParam.rcDp.rcs = this.selectedRC.join(',');
    //this.filterSubject.next(this.filterValue);
  }

  onClear() {
    this.selectedRC = [];
    this.disciplinaryService.selectedRCs.emit(this.selectedRC);
    //this.filterSubject.next(this.filterValue);
  }
}
