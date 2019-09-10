import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { AuthState, useAuth } from '../hooks';
import { setUser } from '../store/actions/authUser';
import { User } from '../types';
import { axiosInstance } from '../utils';
import { Form, Field, FormData } from '../utils/FormUp';
import { AxiosError } from 'axios';

export const Login: React.FC<RouteComponentProps> = props => {
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [invalidLoginMsg, setInvalidLoginMsg] = useState('');

  const isAuth = useAuth();

  const { from } = props.location.state || { from: { pathname: '/' } };

  const handleLogin = ({ username, password }: FormData) => {
    axiosInstance
      .post<User>('/auth/login', { username, password })
      .then(res => {
        dispatch(setUser(res.data));
        setIsLoggedIn(true);
      })
      .catch((e: AxiosError) => {
        if (e.response && e.response.status === 401) {
          setInvalidLoginMsg('Invalid Credentials');
          return;
        }

        setInvalidLoginMsg('Error, please try agian later');
      });
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
            <div
              style={{
                maxWidth: '30rem',
                minWidth: '20rem',
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Form onSubmit={handleLogin} submitText="Login">
                <Field.Input label="username" name="username" required />
                <Field.Input
                  label="password"
                  name="password"
                  required
                  type="password"
                />
              </Form>
              <div
                style={{
                  color: 'rgba(255, 0, 0, 0.8)',
                  fontStyle: 'oblique',
                  margin: '1rem 0',
                  height: '1rem',
                }}
              >
                {invalidLoginMsg}
              </div>
            </div>
          )}
        </>
      );
  }
};
