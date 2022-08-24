import { ITopInfractionsChart } from "./ITopInfractionsChart";

export interface ICasesCountByYear {
    flag: string;
    count: number;
    year: string;
}

export interface IDisciplinary {
    casesCountByYear?:ICasesCountByYear[],
    topInfractionsChart?: ITopInfractionsChart[]
}