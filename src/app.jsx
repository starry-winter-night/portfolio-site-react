import React from 'react';
import './app.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Portfolio from './components/portfolio/portfolio';
import Study from './components/study_youtube/study';
import Login from './components/common/auth/login';
import Summary from './components/summary_card/summary';
import Error from './components/error/error';

const App = ({
  authService,
  cloudinary,
  highLightMenu,
  moveSection,
  starryNight,
  summaryCard,
  youtube,
}) => {
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
          <Login authService={authService} />
        </Route>

        <Route path="/study">
          <Study youtube={youtube} authService={authService} />
        </Route>

        <Route path="/summary">
          <Summary
            authService={authService}
            cloudinary={cloudinary}
            summaryCard={summaryCard}
          />
        </Route>

        <Route path={['/error', '*']}>
          <Error authService={authService} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
