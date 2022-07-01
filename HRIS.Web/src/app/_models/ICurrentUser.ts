import { IRole } from './IRole';
import { IUserGroup } from "./IUserGroup";


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
