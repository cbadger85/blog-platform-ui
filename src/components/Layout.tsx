import React from 'react';
import { axiosInstance } from '../utils';
import { useDispatch } from 'react-redux';
import { ClearUser } from '../store/actions/authUser';
import { Link } from 'react-router-dom';

export const Layout: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axiosInstance
      .post('/auth/logout')
      .then(() => dispatch(ClearUser()))
      .catch(() => null);
  };

  return (
    <div>
      <button onClick={handleLogout}>logout</button>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/test">Test</Link>
      </div>
      <>{children}</>
    </div>
  );
};
