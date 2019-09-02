import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/actions/authUser';
import { AppState } from '../store/reducers';
import { User } from '../types';
import { axiosInstance } from '../utils';

export enum AuthState {
  IS_LOADING = 'IS_LOADING',
  IS_AUTHORIZED = 'IS_AUTHORIZED',
  IS_UNAUTHORIZED = 'IS_UNAUTHORIZED',
}

export const useAuth = (): AuthState => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector<AppState, boolean>(
    state => state.authUser.isLoggedIn
  );
  const [isAuth, setIsAuth] = useState(AuthState.IS_LOADING);

  useEffect(() => {
    if (isLoggedIn) {
      setIsAuth(AuthState.IS_AUTHORIZED);
    } else {
      axiosInstance
        .get<User>('/users/current')
        .then(res => {
          dispatch(setUser(res.data));
          setIsAuth(AuthState.IS_AUTHORIZED);
        })
        .catch(_e => setIsAuth(AuthState.IS_UNAUTHORIZED));
    }
  }, [isLoggedIn, dispatch]);

  return isAuth;
};
