import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import StarryNight from './service/starryNight/main';

const starryNight = new StarryNight();

ReactDOM.render(
  <React.StrictMode>
    <App starryNight={starryNight} />
  </React.StrictMode>,
  document.getElementById('root')
);
