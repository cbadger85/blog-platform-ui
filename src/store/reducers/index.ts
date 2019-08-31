import { authUserReducer, IAuthUserState } from './authUserReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers<IAppState>({
  authUser: authUserReducer,
});

export interface IAppState {
  readonly authUser: IAuthUserState;
}
