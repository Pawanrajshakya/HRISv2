import { IRole } from './role';

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
}

export interface IUserGroup {
  userID?: string;
  groupID?: number;
  description?: string;
}

export interface ISearchUser {
  ein: string,
  name: string
}

export interface IUser {
  userID?: string;
  lanID?: string;
  roleID: number;
  ein?: string;
  firstName: string;
  lastName: string;
  emailAddress?: string;
  isSuper?: boolean;
  usersGroups: number[];
  isHRISUser?: boolean;
  isHDHSUser?: boolean;
  lastAccess?: string;
  rCs: string[];
  dPs: string[];
  agency?: string;
  roleDesc?: string;
}

export interface IUserList {
  total?: number;
  rowNum?: number;
  lanID?: string;
  roleID?: number;
  roleDesc?: string;
  ein?: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  groups?: string;
  isSuper?: boolean;
}
