import React, { useState, useEffect } from 'react';
import './app.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Portfolio from './components/portfolio/portfolio';
import Study from './components/study_youtube/study';
import Login from './components/common/auth/login';
import Summary from './components/summary_card/summary';
import Error from './components/error/error';

const App = ({
  starryNight,
  highLightMenu,
  moveSection,
  youtube,
  authService,
}) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    authService.loginUserCheck((user) => {
      if (user) {
        setAuth('login');
      } else {
        setAuth('nonLogin');
      }
    });
  }, [authService]);

  const onLogout = () => {
    authService.logout();

    setAuth('nonLogin');

    return;
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Portfolio
            FontAwesome={FontAwesomeIcon}
            starryNight={starryNight}
            highLightMenu={highLightMenu}
            moveSection={moveSection}
            auth={auth}
          />
        </Route>
        <Route path="/login">
          <Login
            FontAwesome={FontAwesomeIcon}
            authService={authService}
            auth={auth}
          />
        </Route>
        <Route path="/study">
          <Study
            FontAwesome={FontAwesomeIcon}
            youtube={youtube}
            auth={auth}
            onLogout={onLogout}
          />
        </Route>
        <Route path="/summary">
          <Summary
            FontAwesome={FontAwesomeIcon}
            auth={auth}
            onLogout={onLogout}
          />
        </Route>
        <Route path={['/error', '*']}>
          <Error
            FontAwesome={FontAwesomeIcon}
            auth={auth}
            onLogout={onLogout}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
