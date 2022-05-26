
import { ChartConfiguration, ChartData, ChartType, ChartEvent } from 'chart.js';

export interface IEcard {
  labels?: string;
  data: number;
  date?: string;
}

export interface IChartData {
  barChartData: ChartData<'bar'>,
  barChartOptions: ChartConfiguration['options'],
  barChartPlugins: never[],
  barChartType: ChartType
}
