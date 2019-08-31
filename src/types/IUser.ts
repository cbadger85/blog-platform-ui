export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  permissions?: IPermissions[];
  sessionId: string;
  bio: string;
  gravatar: string;
}

export enum IPermissions {
  USER_MANAGEMENT = 'USER_MANAGEMENT',
}
