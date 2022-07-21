import { IHRISError } from "./IHRISError";

export interface IStaffDetail {
        ein: string;
        firstName: string;
        lastName: string;
        legalName: string;
        personalEmail: string;
        leaveStatus: string;
        actionCode: string;
        actionReason: string;
        actionDate: string;
        dpCode: string;
        dpName: string;
        payTitleCode: string;
        payTitle: string;
        payTitleLevel: string;
        titleDate: string;
        csStatusCode: string;
        csStatus: string;
        payClass: string;
        backupTitleCode: string;
        backupTitle: string;
        backupTitleLevel: string;
        buTitleSuffix: string;
        buTitleDate: string;
        buMgrLvl: string;
        buLVStatus: string;
        buLeaveStatus: string;
        buLVReason: string;
        buDisbcd: string;
        buDisbName: string;
        buDP: string;
        budgetCode: string;
        cityDate: string;
        agencyDate: string;
        listNum: number;
        positionNum: number;
        rcCode: string;
        rcName: string;
        disbCode: string;
        disbName: string;
        muCode: string;
        muName: string;
        vetStatus: string;
        penind: string;
        penTier: string;
        schdtype: string;
        collectiveBargain: string;
        physhand: string;
        probind: string;
        unconvLeaveStatus: string;
        leaveDate: string;
        locationCode: string;
        workAddress: string;
        workCity: string;
        workZipCode: string;
        workPhone: string;
        workEmail: string;
        homeAddress: string;
        homeCity: string;
        homeState: string;
        zipCode: string;
        homePhone: string;
        supervisor: string;
        showPreferredColumns: boolean;
}

export interface IStaffEDUDetail {
        rowNo: number;
        ein: string;
        lastName: string;
        firstName: string;
        rcCode: string;
        dpCode: string;
        locationName: string;
        dateInfraction: string;
        charges: string;
        requestSourceDescription: string;
        dateReceived: string;
        trackingNo: string;
        icDate: string;
        icPenalty: string;
        currentStatus: string;
}

export interface IStaffEmergencyContactInfo {
        name: string;
        relationship: string;
        primaryPhone: string;
        sSecondaryPhone: string;
}

export interface IStaffOvertimeSummary {
        calendarORFiscal: string;
        salary: string;
        adComp: string;
        sumNightDifferentialYTD: number;
        totBasePay: number;
        oT_YTDAmt: string;
        oT_YTDHrs: string;
        totBasePlusOT: number;
        sumNightDifferentialPerm: number;
        compYTD: string;
        waiverStatus: string;
        waiverPrcnt: string;
        waiverAmt: number;
        otPercentofBaseSalary: number;
        otPcntRemainingNew: number;
        blocked: string;
        posOrNegCap: number;
        bal_Allowed: number;
        flsa: string;
        nonFLSACompTimeBal: string;
        flsaCompTimeBal: string;
        hourlyRate: string;
        workweekHours: number;
        hrsWrkdThisPeriod: string;
}

export interface IStaffDetails {
        staffDetail?: IStaffDetail,
        staffEDUDetail?: IStaffEDUDetail,
        staffEmergencyContactInfo?: IStaffEmergencyContactInfo,
        staffOvertimeSummary?: IStaffOvertimeSummary,
        error?: IHRISError
}