import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import StarryNight from './service/starry_night/main';
import HighLightMenu from './service/menu_control/highlight_menu_list.js';
import MoveSection from './service/menu_control/move_menu_section';
import Youtube from './service/youtube/youtube';
import AuthService from './service/firebase/auth_service';
import SmpChat from './service/smp_chat/smp_chat';
import Cloudinary from './service/cloudinary/cloudinary'

import socketIo from 'socket.io-client';

import Smpchat from './components/common/smp_chat/smp_chat';

const starryNight = new StarryNight();
const highLightMenu = new HighLightMenu();
const moveSection = new MoveSection();
const authService = new AuthService();
const youtube = new Youtube(process.env.REACT_APP_YOUTUBE_API_KEY);
const smpChat = new SmpChat(socketIo);
const cloudinary = new Cloudinary();

ReactDOM.render(
  // <React.StrictMode>
  <>
    <App
      starryNight={starryNight}
      highLightMenu={highLightMenu}
      moveSection={moveSection}
      youtube={youtube}
      authService={authService}
      cloudinary={cloudinary}
    />
    <Smpchat authService={authService} smpChat={smpChat} />
  </>,
  // </React.StrictMode>,
  document.getElementById('root')
);
