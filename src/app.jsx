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
  socketIo,
}) => {
  const [loginState, setLogoinState] = useState({ state: null });

  useEffect(() => {
    authService.loginUserCheck((user) => {
      if (user) {
        setLogoinState((item) => {
          return { ...item, state: 'login' };
        });

        const script = document.createElement('script');
        script.src = `http://localhost:5000/smpChat/chatService.js?CLIENTID=${process.env.REACT_APP_CLIENTID}`;
        script.defer = true;
        document.body.appendChild(script);

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'http://localhost:5000/smpChat/chatService.css';
        document.body.appendChild(link);

        script.addEventListener('load', () => {
          const chat = new window.smpChat.setting.chatService(
            process.env.REACT_APP_CLIENTID,
            process.env.REACT_APP_API_KEY,
            socketIo
          );

          chat.init('test2', 'smpChat');
        });
      } else {
        setLogoinState((item) => {
          return { ...item, state: 'nonLogin' };
        });
      }
    });
  }, [authService, socketIo]);

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
