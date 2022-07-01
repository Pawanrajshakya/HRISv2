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