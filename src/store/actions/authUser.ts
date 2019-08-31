import { IAuthUserState } from '../reducers/authUserReducer';
import { IUser } from '../../types';

export type IAuthUserAction = ISetUser | IClearUser;

export enum IAuthUserTypes {
  SET_USER = 'SET_USER',
  CLEAR_USER = 'CLEAR_USER',
}

export interface ISetUser {
  type: IAuthUserTypes.SET_USER;
  payload: IAuthUserState;
}

export interface IClearUser {
  type: IAuthUserTypes.CLEAR_USER;
  payload: IAuthUserState;
}

export const setUser = (user: IUser): ISetUser => ({
  type: IAuthUserTypes.SET_USER,
  payload: { ...user, isLoggedIn: true },
});

export const ClearUser = (): IClearUser => ({
  type: IAuthUserTypes.CLEAR_USER,
  payload: {
    id: '',
    name: '',
    username: '',
    email: '',
    permissions: [],
    bio: '',
    gravatar: '',
    isLoggedIn: false,
  },
});
