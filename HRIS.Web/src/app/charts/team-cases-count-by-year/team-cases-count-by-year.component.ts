import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { map, tap } from 'rxjs';
import { ChartBaseComponent } from 'src/app/base/chart-base.component';
import { IChartData } from 'src/app/_models/ecard';
import { ICasesCountByYear } from 'src/app/_models/team';
import { ICurrentUser } from 'src/app/_models/user';
import { TeamService } from 'src/app/_services/team.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-team-cases-count-by-year',
  templateUrl: './team-cases-count-by-year.component.html',
  styleUrls: ['./team-cases-count-by-year.component.scss']
})
export class TeamCasesCountByYearComponent extends ChartBaseComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  currentUser: ICurrentUser;

  title: string = "";

  _chartDataLabel: string[] = [];

  _chartDataDatasets: any = [];

  casesCountByYearChart$ = this.teamService.casesCountByYearChart$
    .pipe<IChartData>(
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
              data: [], label: x,
              backgroundColor: this.backgroundColor[_index],
              borderColor: 'white',
              borderWidth: 2,
              hoverBackgroundColor: 'white',
              hoverBorderColor: 'black',
              borderRadius: 10
            })
          })

          rows.forEach(
            (row: ICasesCountByYear) => {
              let y = _label.indexOf(row.year);
              this._chartDataDatasets[y].data.push(row.count);
            })
        }

        console.log('out this._dataset', this._chartDataDatasets, this._chartDataLabel);

        let data: Array<number> = [];
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
          barChartData: barChartData,
          barChartOptions: barChartOptions,
          barChartType: barChartType
        } as IChartData;
      })
    );

  constructor(private teamService: TeamService,
    private userService: UserService) {
    super();
    this.currentUser = this.userService.currentUser;
  }

  ngOnInit(): void {
    this.title = "Disciplinary Cases Received and Closed Year-to-Date";

  }


}
