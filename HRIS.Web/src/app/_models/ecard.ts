
import { ChartConfiguration, ChartData, ChartType, ChartEvent } from 'chart.js';

export interface Ecard {
  labels?: string;
  data: number;
  date?: string;
}

export interface EcardChart {
  barChartData: ChartData<'bar'>,
  barChartOptions: ChartConfiguration['options'],
  barChartPlugins: never[],
  barChartType: ChartType
}
