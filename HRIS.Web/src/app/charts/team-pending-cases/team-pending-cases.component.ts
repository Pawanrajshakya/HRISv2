import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { map } from 'rxjs';
import { ChartBaseComponent } from 'src/app/base/chart-base.component';
import { IChartData } from 'src/app/_models/ecard';
import { IPendingCasesChart } from 'src/app/_models/team';
import { ICurrentUser } from 'src/app/_models/user';
import { TeamService } from 'src/app/_services/team.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-team-pending-cases',
  templateUrl: './team-pending-cases.component.html',
  styleUrls: ['./team-pending-cases.component.scss']
})
export class PendingCasesComponent extends ChartBaseComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  currentUser: ICurrentUser;

  tableLabel: string [] = [];

  pendingCases$ = this.teamService.pendingCasesChart$.pipe<IChartData>(
    map(rows => {

      console.log('>', rows);

      let data: Array<number> = [];
      let barChartData: ChartData<'bar'> = { labels: [], datasets: [] };
      let barChartOptions: ChartConfiguration['options'] =
      {
        responsive: true,
        scales: {
          x: {
            display: false
          },
          y: {
          }
        },
        plugins: {
          legend: {
            display: false,
          }
        }
      };

      let barChartType: ChartType = 'bar';

      Array.isArray(rows) ? rows.forEach((row: IPendingCasesChart) => {
        console.log(row.groupDescription.indexOf('('));
        barChartData.labels?.push(row.groupDescription);
        data.push(row.count);
      }) : "";//handle error;

      barChartData.datasets.push({
        data: data,
        label: '',
        backgroundColor: this.backgroundColor,
        borderColor: 'white',
        borderWidth: 2,
        hoverBackgroundColor: 'white',
        hoverBorderColor: 'black',
        borderRadius: 10
      });

      return {
        barChartData: barChartData,
        barChartOptions: barChartOptions,
        barChartType: barChartType
      } as IChartData;
    }));

  constructor(private teamService: TeamService,
    private userService: UserService) {
      super();
    this.currentUser = this.userService.currentUser;
  }

  ngOnInit(): void {
  }

}
