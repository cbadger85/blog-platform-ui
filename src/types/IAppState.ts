import { IAuthUserState } from './IAuthUserState';

export interface IAppState {
  readonly authUser: IAuthUserState;
}
