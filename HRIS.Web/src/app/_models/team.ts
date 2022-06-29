export interface IPendingCasesChart {
    order: number;
    groupDescription: string;
    count: number;
}

export interface ICasesCountByYear {
    flag: string;
    count: number;
    year: string;
}

export interface ITopInfractionsChart {
    groupDescription: string;
    count: number;
    percentage: number;
}
