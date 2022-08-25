export interface IEmployeeBehavior {
  id: number;
  name: string;
}

export interface IEmployeeBehaviorChart {
  name: string;
  count: number;
  date: string;
  year: number;
  month: number;
  week: string;
}

export interface IEmployeeBehaviorParameters {
  startDate?: string;
  endDate?: string;
  requestStatus?: string;
  jobCenters?: string;
  foodCenters?: string;
  facilities?: string;
  isMonthView?: boolean;
  yearMonth?: string;
}
