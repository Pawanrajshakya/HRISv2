import { IRole } from './IRole';
import { IUserGroup } from "./IUserGroup";

export enum Roles {
  HRS = 1,
  Chief = 2,
  RCHead = 3,
  HRBP = 4,
  Director = 5,
  Supervisor = 6,
  Staff = 7
}

export interface ICurrentUser {
  userID?: string;
  lanID?: string;
  roleID?: number;
  ein?: string;
  firstName: string;
  lastName: string;
  emailAddress?: string;
  isSuper?: boolean;
  role?: IRole;
  roleDescription?: string;
  userGroups: IUserGroup[];
  groups?: number[];
  hasAdmin?: boolean;
  hasTEAMS?: boolean;
  hasOvertime?: boolean;
  hasPAR?: boolean;
  hasHeadcount?: boolean;
  hasEEO?: boolean;
  hasECards?: boolean;
  hasPEAS?: boolean;
  hasCustSvcComplaints?: boolean;
  hasAgencySeparation?: boolean;
  hasVacationRoasters?: boolean;
}