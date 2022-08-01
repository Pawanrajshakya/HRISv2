
export interface IAgencySeparationSummary {
    reasonDesc?: string;
    month?: number;
    monthName?: string;
    year?: number;
    count?: number;
    title?: string;
}

export interface ISeparationTable {
    reason?: string;
    jan: number;
    feb: number;
    mar: number;
    apr: number;
    may: number;
    jun: number;
    jul: number;
    aug: number;
    sep: number;
    oct: number;
    nov: number;
    dec: number;
    grandTotal?: number;
}