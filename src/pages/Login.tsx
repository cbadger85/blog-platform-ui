import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { AuthState, useAuth } from '../hooks';
import { setUser } from '../store/actions/authUser';
import { User } from '../types';
import { axiosInstance } from '../utils';
import { Form, Input, FormData } from '../utils/FormUp';

export const Login: React.FC<RouteComponentProps> = props => {
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAuth = useAuth();

  const { from } = props.location.state || { from: { pathname: '/' } };

  const handleLogin = ({ username, password }: FormData) => {
    axiosInstance
      .post<User>('/auth/login', { username, password })
      .then(res => {
        dispatch(setUser(res.data));
        setIsLoggedIn(true);
      })
      .catch(e => console.error(e));
  };

  switch (isAuth) {
    case AuthState.IS_LOADING:
      return <div>Loading...</div>;
    case AuthState.IS_AUTHORIZED:
      return <Redirect to={from} />;
    default:
      return (
        <>
          {isLoggedIn ? (
            <Redirect to={from} />
          ) : (
            <div>
              <Form submit={handleLogin}>
                <Input
                  id="username"
                  placeholder="username"
                  required
                  validate={input => input.length > 2}
                  validationMessage="I'm invalid"
                />
                <Input
                  id="password"
                  placeholder="password"
                  required
                  type="password"
                />
              </Form>
            </div>
          )}
        </>
      );
  }
};
