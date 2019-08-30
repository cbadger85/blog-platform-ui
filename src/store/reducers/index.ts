import { authUserReducer } from './authUserReducer';
import { combineReducers } from 'redux';
import { IAppState } from '../../types';

export const rootReducer = combineReducers<IAppState>({
  authUser: authUserReducer,
});
