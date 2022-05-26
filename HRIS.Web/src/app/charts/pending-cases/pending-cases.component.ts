import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { map } from 'rxjs';
import { IChartData } from 'src/app/_models/ecard';
import { IPendingCasesChart } from 'src/app/_models/team';
import { ICurrentUser } from 'src/app/_models/user';
import { TeamService } from 'src/app/_services/team.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-pending-cases',
  templateUrl: './pending-cases.component.html',
  styleUrls: ['./pending-cases.component.scss']
})
export class PendingCasesComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  currentUser: ICurrentUser;

  
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
        barChartData.labels?.push(row.groupDescription);
        data.push(row.count);
      }) : "";//handle error;

      // , '#037bc0', '#02af57', '#4A235A', '#FC4F4F', '#FC6228', '#B7950B', '#BA4A00', '#5F6A6A', '#8B1A1A'
      barChartData.datasets.push({
        data: data,
        label: '',
        backgroundColor: ['orange'],
        borderColor: 'white',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(241,171,65,1)',
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
    this.currentUser = this.userService.currentUser;
  }

  ngOnInit(): void {
  }

}
