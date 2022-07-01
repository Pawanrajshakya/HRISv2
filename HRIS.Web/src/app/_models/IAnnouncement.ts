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

