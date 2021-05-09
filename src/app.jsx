import React from 'react';
import './app.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Portfolio from './components/portfolio/portfolio';
import Study from './components/study/study';

const App = ({ starryNight, highLightMenu, moveSection, youtube }) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Portfolio
            FontAwesome={FontAwesomeIcon}
            starryNight={starryNight}
            highLightMenu={highLightMenu}
            moveSection={moveSection}
          />
        </Route>
        <Route path="/study">
          <Study FontAwesome={FontAwesomeIcon} youtube={youtube} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
