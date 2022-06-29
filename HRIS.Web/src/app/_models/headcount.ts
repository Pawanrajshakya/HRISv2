
import { ChartConfiguration, ChartData, ChartType, ChartEvent } from 'chart.js';

export interface IHeadcountChartData {
    rowNum: number;
    period: string;
    vacancy: number;
    budgetedHeadcount: number;
    activeStaff: number;
}

