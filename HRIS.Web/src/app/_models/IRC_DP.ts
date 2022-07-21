export interface IRC {
    code?: string;
    description?: string;
}

export interface IDP {
    dpCode?:string;
    dpName?:string;
    rcCode?:string;
}

export interface IRC_DP{
    RC?:IRC[];
    DP?:IDP[];
}