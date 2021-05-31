import React, { useState, useEffect } from 'react';
import './app.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
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
  cloudinary,
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

  const onLogin = (uid) => {
    setAuth('login');
  };

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
            starryNight={starryNight}
            highLightMenu={highLightMenu}
            moveSection={moveSection}
          />
        </Route>
        <Route path="/login">
          {auth === 'nonLogin' ? (
            <Login authService={authService} auth={auth} onLogin={onLogin} />
          ) : (
            <Redirect to="/study" />
          )}
        </Route>

        {auth === 'login' && (
          <Route path="/study">
            <Study youtube={youtube} onLogout={onLogout} />
          </Route>
        )}

        {auth === 'login' && (
          <Route path="/summary">
            <Summary onLogout={onLogout} cloudinary={cloudinary} />
          </Route>
        )}

        {auth === 'login' && (
          <Route path={['/error', '*']}>
            <Error onLogout={onLogout} />
          </Route>
        )}

        {auth === 'nonLogin' && <Redirect to="/login" />}
      </Switch>
    </Router>
  );
};

export default App;
