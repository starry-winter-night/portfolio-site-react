import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import StarryNight from './service/starryNight/main';
import HighLightMenu from './service/menuControl/highlightMenuList.js';
import MoveSection from './service/menuControl/moveMenuSection';
import Youtube from './service/youtube/youtube';
import AuthService from './service/firebase/auth_service';

const starryNight = new StarryNight();
const highLightMenu = new HighLightMenu();
const moveSection = new MoveSection();
const authService = new AuthService();
const youtube = new Youtube(process.env.REACT_APP_YOUTUBE_API_KEY);

ReactDOM.render(
  <React.StrictMode>
    <App
      starryNight={starryNight}
      highLightMenu={highLightMenu}
      moveSection={moveSection}
      youtube={youtube}
      authService={authService}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
