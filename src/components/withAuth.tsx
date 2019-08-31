import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { IAppState } from '../store/reducers';

export function withAuth<T>(Component: React.FC<T>) {
  return function(props: T) {
    const isLoggedIn = useSelector<IAppState, boolean>(
      state => state.authUser.loggedIn
    );

    return (
      <>{isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />}</>
    );
  };
}
