import { authUserReducer, AuthUserState } from './authUserReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  authUser: authUserReducer,
});

export interface AppState {
  authUser: AuthUserState;
}
