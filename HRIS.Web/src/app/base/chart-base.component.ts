import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-chart-base',
  template: `
    <p>
      base works!
    </p>
  `,
  styles: [
  ]
})
export class ChartBaseComponent {

  backgroundColor: string[] = ['rgba(247,203,137)', 'rgba(78,162,210)', 'rgba(52,191,120)', 'rgba(110,78,122)', 'rgba(252,114,114)', 'rgba(252,129,82)', 'rgba(197,170,59)', 'rgba(199,110,50)', 'rgba(126,135,135)', 'rgba(162,71,71)'];

  hoverBackgroundColor: string[] = ['#f1ab41', '#037bc0', '#02af57', '#4A235A', '#FC4F4F', '#FC6228', '#B7950B', '#BA4A00', '#5F6A6A', '#8B1A1A'];

  borderRadius: number = 10;

  borderWidth: number = 2;

  borderColor: string = 'white';

  constructor() { }

}

export interface IBarChartData {
  chartData: ChartData<'bar'>,
  chartOptions: ChartConfiguration['options'],
  chartPlugins: never[],
  chartType: ChartType
}


export interface IPieChartData {
  chartData: ChartData<'pie'>,
  chartOptions: ChartConfiguration['options'],
  chartPlugins: never[],
  chartType: ChartType,
}

export interface ILineChartData {
  chartData: ChartData<'line'>,
  chartOptions: ChartConfiguration['options'],
  chartPlugins: never[],
  chartType: ChartType
}
