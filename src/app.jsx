import React, { useState, useEffect } from 'react';
import './app.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Portfolio from './components/portfolio/portfolio';
import Study from './components/study/study';
import Login from './components/common/login/login';

const App = ({
  starryNight,
  highLightMenu,
  moveSection,
  youtube,
  authService,
}) => {
  const [loginState, setLogoinState] = useState({ state: null });

  useEffect(() => {
    authService.loginUserCheck((user) => {
      if (user) {
        setLogoinState((item) => {
          return { ...item, state: 'login' };
        });
      } else {
        setLogoinState((item) => {
          return { ...item, state: 'nonLogin' };
        });
      }
    });
  }, [authService]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Portfolio
            FontAwesome={FontAwesomeIcon}
            starryNight={starryNight}
            highLightMenu={highLightMenu}
            moveSection={moveSection}
            authService={authService}
          />
        </Route>
        <Route path="/login">
          <Login
            FontAwesome={FontAwesomeIcon}
            authService={authService}
            loginState={loginState}
          />
        </Route>
        <Route path="/study">
          <Study
            FontAwesome={FontAwesomeIcon}
            youtube={youtube}
            authService={authService}
            loginState={loginState}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
