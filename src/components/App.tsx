import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Homepage, Login } from '../pages';
import { withAuth } from './';

export const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Route path="/" exact component={withAuth(Homepage)} />
        <Route path="/Login" exact component={Login} />
      </Router>
    </div>
  );
};
