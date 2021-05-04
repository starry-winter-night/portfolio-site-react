import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import StarryNight from './service/starryNight/main';
import HighLightMenu from './service/menuControl/highlightMenuList.js';
import MoveSection from './service/menuControl/moveMenuSection';

const starryNight = new StarryNight();
const highLightMenu = new HighLightMenu();
const moveSection = new MoveSection();

ReactDOM.render(
  <React.StrictMode>
    <App
      starryNight={starryNight}
      highLightMenu={highLightMenu}
      moveSection={moveSection}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
