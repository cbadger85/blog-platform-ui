import { User } from '../../types';
import { AuthUserAction, AuthUserTypes } from '../actions/authUser';

export interface AuthUserState extends Omit<User, 'sessionId'> {
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
  { type, payload }: AuthUserAction
): AuthUserState => {
  switch (type) {
    case AuthUserTypes.SET_USER:
      return payload;
    case AuthUserTypes.CLEAR_USER:
      return defaultState;
    default:
      return state;
  }
};
