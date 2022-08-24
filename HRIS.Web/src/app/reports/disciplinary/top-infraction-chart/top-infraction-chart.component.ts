import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { merge, startWith, switchMap, Observable, observable } from 'rxjs';
import { getFullYear } from 'ngx-bootstrap/chronos';
import { BaseComponent } from 'src/app/base/base.component';
import { ITopInfractionsChart } from 'src/app/_models/ITopInfractionsChart';
import { DisciplinaryService } from 'src/app/_services/disciplinary.service';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-top-infraction-chart',
  templateUrl: './top-infraction-chart.component.html',
  styleUrls: ['./top-infraction-chart.component.scss'],
})
export class TopInfractionChartComponent
  extends BaseComponent<ITopInfractionsChart>
  implements OnInit, AfterViewInit
{
  @ViewChild(BaseChartDirective) Chart: BaseChartDirective | undefined;

  //#region  Top Five Infraction
  titleTFI: string = '';
  chartTypeTFI: ChartType = 'pie';
  chartDataTFI: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: this.backgroundColor,
        hoverBackgroundColor: this.hoverBackgroundColor,
        borderColor: this.borderColor,
        borderWidth: this.borderWidth,
        hoverBorderColor: this.hoverBackgroundColor,
      },
    ],
  };
  chartPluginsTFI: never[] | undefined;
  chartOptionsTFI: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: { display: false },
      y: { display: false },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'end',
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
    this.titleTFI =
      'Summary of the Top Five Infractions in DSS-HRA-DHS received Year-To-Date (' +
      _date.toLocaleDateString() +
      ' - ' +
      new Date().toLocaleDateString() +
      ')';
  }

  ngOnInit(): void {
    this.filterSubject.next(this.filterValue);
    this.disciplinaryService.selectedRCs.subscribe({
      next: (rcs: string[]) => {
        console.log('TopInfractionChartComponent>rcs', rcs);
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
          return this.dataService.GetTopInfractionsChart$(
            this.selectedRC.join(',') ?? ''
          );
        })
      )
      .subscribe({
        next: (_data) => {
          console.log('1', _data);
          this.chartDataTFI.labels = [];
          this.chartDataTFI.datasets[0].data = [];
          Array.isArray(_data)
            ? _data.forEach((_row) => {
                console.log(_row);
                this.chartDataTFI.labels?.push(
                  _row.groupDescription +
                    ' ' +
                    _row.percentage +
                    '%        ' +
                    _row.count
                );
                this.chartDataTFI.datasets[0].data.push(_row.count);
              })
            : ''; //handle error;
          this.Chart?.update();
          this.isLoadingResults = false;
        },
      });
  }
}
