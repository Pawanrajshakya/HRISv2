import { Role } from './role';

export interface User {
  userID?: string;
  lanID?: string;
  roleID?: number;
  ein?: string;
  firstName: string;
  lastName: string;
  emailAddress?: string;
  isSuper?: boolean;
  role?: Role;
  roleDescription?: string;
  userGroups: UserGroup[];
  groupDescription?: string;
}

export interface UserGroup {
  userID?: string;
  groupID?: number;
  description?: string;
}

export interface SearchUser{
  ein: string,
  name: string
}

