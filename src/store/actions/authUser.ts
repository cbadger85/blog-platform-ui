import { AuthUserState } from '../reducers/authUserReducer';
import { User } from '../../types';

export type AuthUserAction = SetUser | ClearUser;

export enum AuthUserTypes {
  SET_USER = 'SET_USER',
  CLEAR_USER = 'CLEAR_USER',
}

export interface SetUser {
  type: AuthUserTypes.SET_USER;
  payload: AuthUserState;
}

export interface ClearUser {
  type: AuthUserTypes.CLEAR_USER;
  payload: AuthUserState;
}

export const setUser = (user: User): SetUser => ({
  type: AuthUserTypes.SET_USER,
  payload: { ...user, isLoggedIn: true },
});

export const ClearUser = (): ClearUser => ({
  type: AuthUserTypes.CLEAR_USER,
  payload: {
    id: '',
    name: '',
    username: '',
    email: '',
    permissions: {
      collections: [],
      accessLevel: [],
    },
    bio: '',
    gravatar: '',
    isLoggedIn: false,
  },
});
