import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../router/Home';
import Auth from '../router/Auth';
import Navigation from './Navigation';
import Profile from '../router/Profile';

const RouterComponent = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default RouterComponent;
