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
      return <div>Loading...</div>; // TODO need to make a loader for this
    case AuthState.IS_AUTHORIZED:
      return <Redirect to={from} />;
    default:
      return (
        <>
          {isLoggedIn ? (
            <Redirect to={from} />
          ) : (
            <div>
              <Form onSubmit={handleLogin} submitText="Login">
                <Input name="username" placeholder="username" required />
                <Input
                  name="password"
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
