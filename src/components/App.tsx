import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Homepage, Login } from '../pages';
import { history } from '../utils/history';
import { PrivateRoute } from './PrivateRoute';
import { Test } from './Test';

export const App: React.FC = () => {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route path="/Login" exact component={Login} />
          <PrivateRoute path="/" exact component={Homepage} />
          <Route path="/test" exact component={Test} />
        </Switch>
      </Router>
    </div>
  );
};
