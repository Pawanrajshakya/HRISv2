import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { getFullYear } from 'ngx-bootstrap/chronos';
import { map } from 'rxjs';
import { ChartBaseComponent, IBarChartData } from 'src/app/base/chart-base.component';
import { ICasesCountByYear } from "src/app/_models/ICasesCountByYear";
import { ICurrentUser } from "src/app/_models/ICurrentUser";
import { ChartService } from 'src/app/_services/chart.service';
import { LoginService } from 'src/app/_services/login.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-team-cases-count-by-year',
  templateUrl: './team-cases-count-by-year.component.html',
  styleUrls: ['./team-cases-count-by-year.component.scss']
})
export class TeamCasesCountByYearComponent extends ChartBaseComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  title: string = "";

  _chartDataLabel: string[] = [];

  _chartDataDatasets: any = [];

  casesCountByYearChart$ = this.chartService.casesCountByYearChart$
    .pipe<IBarChartData>(
      map(rows => {

        console.log('casesCountByYearChart>', rows);

        let _label: string[] = [];

        if (Array.isArray(rows)) {
          rows.forEach(
            (row: ICasesCountByYear) => {
              let i = this._chartDataLabel.indexOf(row.flag);
              if (i < 0) {
                this._chartDataLabel.push(row.flag);
              }

              if (_label.indexOf(row.year) < 0) {
                _label.push(row.year);
              }

              console.log('_label', _label);
            }
          );

          let _index = -1;

          _label.forEach((x) => {
            _index += 1;
            this._chartDataDatasets.push({
              data: [], 
              label: x,
              backgroundColor: this.backgroundColor[_index],
              hoverBackgroundColor: this.hoverBackgroundColor[_index],
              hoverBorderColor: this.hoverBackgroundColor[_index],
              borderRadius: this.borderRadius,
              borderWidth: this.borderWidth,
              borderColor: this.borderColor,
            })
          })

          rows.forEach(
            (row: ICasesCountByYear) => {
              let y = _label.indexOf(row.year);
              this._chartDataDatasets[y].data.push(row.count);
            })
        }

        console.log('out this._dataset', this._chartDataDatasets, this._chartDataLabel);

        let barChartData: ChartData<'bar'> = {
          labels: this._chartDataLabel,
          datasets: this._chartDataDatasets
        };

        let barChartOptions: ChartConfiguration['options'] =
        {
          responsive: true,
          scales: {
            x: {
              display: true
            },
            y: {
            }
          },
          plugins: {
            legend: {
              display: true,
            }
          }
        };

        let barChartType: ChartType = 'bar';

        return {
          chartData: barChartData,
          chartOptions: barChartOptions,
          chartType: barChartType
        } as IBarChartData;
      })
    );

  constructor(private chartService: ChartService,
    private loginService: LoginService) {
    super();
  }

  ngOnInit(): void {
    let _date = new Date(getFullYear(new Date),0,1)
    this.title = "Disciplinary Cases Received and Closed Year-to-Date (" + _date.toLocaleDateString() + " - " + (new Date).toLocaleDateString() + ")";
  }
}
