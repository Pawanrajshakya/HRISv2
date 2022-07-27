import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { map } from 'rxjs';
import { getFullYear } from 'ngx-bootstrap/chronos';
import { ITopInfractionsChart } from "src/app/_models/ITopInfractionsChart";
import { ChartService } from 'src/app/_services/chart.service';
import { BaseComponent } from 'src/app/base/base.component';
import { IPieChartData } from 'src/app/_models/IChart';

@Component({
  selector: 'app-team-top-infraction',
  templateUrl: './team-top-infraction.component.html',
  styleUrls: ['./team-top-infraction.component.scss']
})
export class TeamTopInfractionComponent extends BaseComponent<IPieChartData> implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  _chartDataLabel: string[] = [];

  _chartDataDatasets: any = [];

  title: string = "";

  constructor(private chartService: ChartService) {
    super();
  }

  ngOnInit(): void {
    let _date = new Date(getFullYear(new Date),0,1)

    this.title = "Summary of the Top Five Infractions in DSS-HRA-DHS received Year-To-Date (" + _date.toLocaleDateString() + " - " + (new Date).toLocaleDateString() + ")";
  }

  topInfractionChart$ = this.chartService.topInfractionsChart$
    .pipe<IPieChartData>(
      map(rows => {
        console.log('topInfractionChart', rows);

        let _data: number[] = [];

        if (Array.isArray(rows)) {
          rows.forEach(
            (row: ITopInfractionsChart) => {
              this._chartDataLabel.push(row.groupDescription + ' ' + row.percentage.toString() + '% (' + row.count.toString() + ')');
              _data.push(row.count);
              console.log('_label', row);
            }
          );
        }

        let chartData: ChartData<'pie'> = {
          labels: this._chartDataLabel,
          datasets: [{
            data: _data,
            backgroundColor: this.backgroundColor, 
            hoverBackgroundColor: this.hoverBackgroundColor,
            borderColor: this.borderColor,
            borderWidth: this.borderWidth,
            hoverBorderColor: this.hoverBackgroundColor
          }]
        };

        let chartOptions: ChartConfiguration['options'] =
        {
          responsive: true,
          scales: {
            x: {
              display: false
            },
            y: {
              display: false
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            }
          }
        };

        let chartType: ChartType = 'pie';

        return {
          chartData: chartData,
          chartOptions: chartOptions,
          chartType: chartType,
        } as IPieChartData;
      })
    );
}
