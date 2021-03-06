import React, { Suspense, lazy } from 'react';
import './app.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loading from './components/common/loading/loading';

const Portfolio = lazy(() => import('./components/portfolio/portfolio'));
const Study = lazy(() => import('./components/study_youtube/study'));
const Summary = lazy(() => import('./components/summary_card/summary'));
const Login = lazy(() => import('./components/common/auth/login'));
const Error = lazy(() => import('./components/error/error'));

const App = ({
  authService,
  cardRepo,
  cloudinary,
  highLightMenu,
  moveSection,
  smpAuth,
  smpChat,
  starryNight,
  youtube,
  youtubeRepo,
}) => {
  return (
    <Router>
      <Suspense fallback={<Loading/>}>
        <Switch>
          <Route exact path="/">
            <Portfolio
              authService={authService}
              starryNight={starryNight}
              highLightMenu={highLightMenu}
              moveSection={moveSection}
            />
          </Route>

          <Route path="/login">
            <Login
              authService={authService}
              smpAuth={smpAuth}
              smpChat={smpChat}
            />
          </Route>

          <Route path="/study">
            <Study
              youtube={youtube}
              authService={authService}
              cardRepo={cardRepo}
              youtubeRepo={youtubeRepo}
            />
          </Route>

          <Route path="/summary">
            <Summary
              authService={authService}
              cloudinary={cloudinary}
              cardRepo={cardRepo}
            />
          </Route>

          <Route path={['/error', '*']}>
            <Error authService={authService} />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
