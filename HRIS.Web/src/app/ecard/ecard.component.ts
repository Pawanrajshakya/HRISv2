import { Component, ViewChild } from '@angular/core';
import { EcardService } from '../_services/ecard.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { map } from 'rxjs/operators';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { Ecard, EcardChart } from '../_models/ecard';

@Component({
  selector: 'app-ecard',
  templateUrl: './ecard.component.html',
  styleUrls: ['./ecard.component.css']
})
export class EcardComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  currentUser: User;
  ecardChart$ = this.ecardService.eCards$.pipe<EcardChart>(
    map(ecards => {

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

      Array.isArray(ecards) ? ecards.forEach((ecard: Ecard) => {
        barChartData.labels?.push(ecard.labels);
        data.push(ecard.data);
        console.log(data, '1');
      }) : "";//handle error;


      barChartData.datasets.push({
        data: data,
        label: '',
        backgroundColor: ['#f1ab41', '#037bc0', '#02af57', '#4A235A', '#FC4F4F', '#FC6228', '#B7950B', '#BA4A00', '#5F6A6A', '#8B1A1A'],
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
      } as EcardChart;
    }));

  constructor(private ecardService: EcardService, private userService: UserService) {
    this.currentUser = this.userService.currentUser;
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event?.type, active ? active[0] : undefined);
  }
}
