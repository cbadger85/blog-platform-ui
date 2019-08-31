import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/actions/authUser';
import { IAppState } from '../store/reducers';
import { IUser } from '../types';
import { axiosInstance } from '../utils';

export enum IAuthState {
  IS_LOADING = 'IS_LOADING',
  IS_AUTHORIZED = 'IS_AUTHORIZED',
  IS_UNAUTHORIZED = 'IS_UNAUTHORIZED',
}

export const useAuth = (): IAuthState => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector<IAppState, boolean>(
    state => state.authUser.isLoggedIn
  );
  const [isAuth, setIsAuth] = useState(IAuthState.IS_LOADING);

  useEffect(() => {
    if (isLoggedIn) {
      setIsAuth(isAuth);
      setIsAuth(IAuthState.IS_AUTHORIZED);
    } else {
      axiosInstance
        .get<IUser>('/users/current')
        .then(res => {
          dispatch(setUser(res.data));
          setIsAuth(IAuthState.IS_AUTHORIZED);
        })
        .catch(e => setIsAuth(IAuthState.IS_UNAUTHORIZED));
    }
  }, [isAuth, isLoggedIn, dispatch]);

  return isAuth;
};
