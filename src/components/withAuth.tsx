import React from 'react';
import { Redirect } from 'react-router';
import { IAuthState, useAuth } from '../hooks/useAuth';

export function withAuth<T>(Component: React.FC<T>) {
  return function(props: T) {
    const isAuth = useAuth();

    switch (isAuth) {
      case IAuthState.IS_LOADING:
        return <div>Loading...</div>;
      case IAuthState.IS_UNAUTHORIZED:
        return <Redirect to="/login" />;
      default:
        return <Component {...props} />;
    }
  };
}
