import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Homepage, Login } from '../pages';
import { withAuth } from './withAuth';
import { history } from '../utils/history';

export const App: React.FC = () => {
  return (
    <div>
      <Router history={history}>
        <Route path="/" exact component={withAuth(Homepage)} />
        <Route path="/Login" exact component={Login} />
      </Router>
    </div>
  );
};
