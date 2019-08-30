import { IPermissions } from './IUser';

export interface IAuthUserState {
  readonly id: string;
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly permissions: IPermissions[];
  readonly bio: string;
  readonly gravatar: string;
  readonly loggedIn: boolean;
}
