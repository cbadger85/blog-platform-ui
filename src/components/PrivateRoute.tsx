import React from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import { AuthState, useAuth } from '../hooks';
import { Layout } from './Layout';

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...props
}) => {
  const isAuth = useAuth();

  return (
    <Route
      {...props}
      render={withProps => {
        switch (isAuth) {
          case AuthState.IS_LOADING:
            return <div>loading</div>;
          case AuthState.IS_UNAUTHORIZED:
            return (
              <Redirect
                to={{ pathname: '/login', state: { from: withProps.location } }}
              />
            );
          default:
            return (
              <Layout>
                <Component {...withProps} />
              </Layout>
            );
        }
      }}
    />
  );
};

interface PrivateRouteProps extends RouteProps {
  component: React.FC<RouteComponentProps>;
}
