import React from 'react';
import { Redirect } from 'react-router';
import { AuthState, useAuth } from '../hooks';

export function withAuth<T>(
  Component: React.FC<T>
): React.FunctionComponent<T> {
  return function WithAuth(props: T) {
    const isAuth = useAuth();

    switch (isAuth) {
      case AuthState.IS_LOADING:
        return <div>Loading...</div>;
      case AuthState.IS_UNAUTHORIZED:
        return <Redirect to="/login" />;
      default:
        return <Component {...props} />;
    }
  };
}
