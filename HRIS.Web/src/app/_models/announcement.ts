export interface IAnnouncementList {
        total: number;
        rowNum: number;
        id: number;
        title: string;
        durationRestricted: boolean;
        displayAfter: string;
        displayUntil: string;
        priority: number;
        emailSent: boolean;
        createdBy: string;
        dateCreated: string;
        updatedBy: string;
        isActive: boolean;
        isVisible: boolean;
        showing: string;
}

export interface IAnnouncement {
    id: number;
    title: string;
    content: string;
    imageURL: string;
    link: string;
    durationRestricted: boolean;
    displayAfter: string;
    displayUntil: string;
    priority: number;
    emailSent: boolean;
    createdBy: string;
    dateCreated: string;
    updatedBy: string;
    isActive: boolean;
    isVisible: boolean;
    roles: number[];
}

export interface IAnnouncementSummary {
    id?: number;
    title?: string;
    content?: string;
    imageURL?: string;
    link?: string;
}