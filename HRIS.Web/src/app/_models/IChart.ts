import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

export interface IBarChartData {
  chartData: ChartData<'bar'>;
  chartOptions: ChartConfiguration['options'];
  chartPlugins: never[];
  chartType: ChartType;
}

export interface IPieChartData {
  chartData: ChartData<'pie'>;
  chartOptions: ChartConfiguration['options'];
  chartPlugins: never[];
  chartType: ChartType;
}

export interface ILineChartData {
  chartData: ChartData<'line'>;
  chartOptions: ChartConfiguration['options'];
  chartPlugins: never[];
  chartType: ChartType;
}