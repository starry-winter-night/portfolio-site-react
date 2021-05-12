import React, { useState, useEffect } from 'react';
import './app.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Portfolio from './components/portfolio/portfolio';
import Study from './components/study/study';
import Login from './components/Login/login';

const App = ({
  starryNight,
  highLightMenu,
  moveSection,
  youtube,
  firebase,
}) => {
  const [loginState, setLogoinState] = useState({});

  useEffect(() => {
    firebase.loginUserCheck((user) => {
      if (user) {
        setLogoinState({ ...loginState, state: 'login' });
      } else {
        setLogoinState({ ...loginState, state: 'nonLogin' });
      }
    });
  }, [firebase, loginState]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Portfolio
            FontAwesome={FontAwesomeIcon}
            starryNight={starryNight}
            highLightMenu={highLightMenu}
            moveSection={moveSection}
            firebase={firebase}
          />
        </Route>
        <Route path="/login">
          <Login firebase={firebase} loginState={loginState} />
        </Route>
        <Route path="/study">
          <Study
            FontAwesome={FontAwesomeIcon}
            youtube={youtube}
            firebase={firebase}
            loginState={loginState}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
