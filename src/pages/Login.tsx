import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { AuthState, useAuth } from '../hooks';
import { setUser } from '../store/actions/authUser';
import { User } from '../types';
import { axiosInstance } from '../utils';

export const Login: React.FC<RouteComponentProps> = props => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAuth = useAuth();

  const { from } = props.location.state || { from: { pathname: '/' } };

  const handleLogin = () => {
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
            //TODO refactor to separate login form component
            <div>
              <input
                onChange={e => setUsername(e.target.value)}
                value={username}
              />
              <input
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
              <button onClick={handleLogin}>Login</button>
            </div>
          )}
        </>
      );
  }
};
