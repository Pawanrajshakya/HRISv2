
import { ChartConfiguration, ChartData, ChartType, ChartEvent } from 'chart.js';

export interface IHeadcountChartData {
    rowNum: number;
    period: string;
    vacancy: number;
    budgetedHeadcount: number;
    activeStaff: number;
}

export interface IHeadcountChart {
    chartData: ChartData<'line'>,
    chartOptions: ChartConfiguration['options'],
    chartPlugins: never[],
    chartType: ChartType
  }