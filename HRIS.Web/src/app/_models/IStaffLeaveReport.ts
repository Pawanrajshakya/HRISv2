
export interface IStaffLeaveReport {
    total?: number;
    rowNum?: number;
    ein?: string;
    firstName?: string;
    lastName?: string;
    preferredFirstName?: string;
    preferredLastName?: string;
    dpName?: string;
    rcName?: string;
    titleCode?: string;
    titleLevel?: string;
    payTitle?: string;
    rcCode?: string;
    previousDPName?: string;
    dpCode?: string;
    locationCode?: string;
    actionCode?: string;
    leaveDateObserved?: string;
    lvStatusDesc?: string;
    expectedReturnDt?: string;
    showPreferredColumns?: boolean;
}