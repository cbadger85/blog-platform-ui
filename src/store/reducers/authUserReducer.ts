import { Reducer } from 'redux';
import { IAuthUserState } from '../../types';

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
