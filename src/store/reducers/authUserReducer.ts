import { IUser } from '../../types';
import { IAuthUserAction, IAuthUserTypes } from '../actions/authUser';

export interface IAuthUserState extends Omit<IUser, 'sessionId'> {
  isLoggedIn: boolean;
}

const defaultState = {
  id: '',
  name: '',
  username: '',
  email: '',
  bio: '',
  gravatar: '',
  isLoggedIn: false,
};

export const authUserReducer = (
  state = defaultState,
  { type, payload }: IAuthUserAction
): IAuthUserState => {
  switch (type) {
    case IAuthUserTypes.SET_USER:
      return payload;
    case IAuthUserTypes.CLEAR_USER:
      return defaultState;
    default:
      return state;
  }
};
