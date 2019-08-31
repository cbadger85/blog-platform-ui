import { Reducer } from 'redux';
import { IPermissions } from '../../types';

const defaultState = {
  id: '',
  name: '',
  username: '',
  email: '',
  permissions: [],
  bio: '',
  gravatar: '',
  loggedIn: false,
};

export const authUserReducer: Reducer<IAuthUserState> = (
  state = defaultState,
  { type, payload }
) => {
  switch (type) {
    default:
      return state;
  }
};

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
