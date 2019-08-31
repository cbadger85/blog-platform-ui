import { authUserReducer, IAuthUserState } from './authUserReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  authUser: authUserReducer,
});

export interface IAppState {
  authUser: IAuthUserState;
}
