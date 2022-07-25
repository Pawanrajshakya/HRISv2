
export interface IVacationRosterReport {
    total?: number;
    rowNum?: number;
    rc?: string;
    dp?: string;
    dpName?: string;
    locationCode?: string;
    workAddress?: string;
    ein?: string;
    empName?: string;
    leaveStatus?: string;
    titleCode?: string;
    titleDescription?: string;
    titleLevel?: string;
    sortLvl?: string;
    cSStatus?: string;
    actionReason?: string;
    titleDate?: string;
    lvlEntryDT?: string;
    josConv?: string;
    rankDate?: string;
    rankBy?: string;
    listNo?: number;
    exam?: string;
    examDate?: string;
    ss?: string;
    unionName?: string;
    agy?: string;
    countCheck?: number;
}

export interface ISeparationSummary {
    reasonDesc?: string;
    month?: number;
    monthName?: string;
    year?: number;
    count?: number;
    title?: string;
}

export interface IAgencySeparationChart {
    description?: string;
    total?: number;
}