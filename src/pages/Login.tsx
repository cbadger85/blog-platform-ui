import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { useAuth, AuthState } from '../hooks';
import { setUser } from '../store/actions/authUser';
import { User } from '../types';
import { axiosInstance, history } from '../utils';

export const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isAuth = useAuth();

  console.log(isAuth);

  const handleLogin = () => {
    axiosInstance
      .post<User>('/auth/login', { username, password })
      .then(res => {
        dispatch(setUser(res.data));
        history.push('/');
      })
      .catch(e => console.error(e));
  };

  switch (isAuth) {
    case AuthState.IS_LOADING:
      return <div>Loading...</div>;
    case AuthState.IS_AUTHORIZED:
      return <Redirect to="/" />;
    default:
      return (
        <div>
          <input onChange={e => setUsername(e.target.value)} value={username} />
          <input onChange={e => setPassword(e.target.value)} value={password} />
          <button onClick={handleLogin}>Login</button>
        </div>
      );
  }
};
