import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import StarryNight from './service/starryNight/main';
import HighLightMenu from './service/menuControl/highlightMenuList.js';
import MoveSection from './service/menuControl/moveMenuSection';
// import RocketGuide from './service/rocketGuide/rocketGuide';

const starryNight = new StarryNight();
const highLightMenu = new HighLightMenu();
const moveSection = new MoveSection();
// const rocketGuide = new RocketGuide();

ReactDOM.render(
  <React.StrictMode>
    <App
      starryNight={starryNight}
      highLightMenu={highLightMenu}
      moveSection={moveSection}
      // rocketGuide={rocketGuide}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
