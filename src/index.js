import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';

import AuthService from './service/firebase/auth_service';
import Cloudinary from './service/cloudinary/cloudinary';
import HighLightMenu from './service/menu_control/highlight_menu_list.js';
import MoveSection from './service/menu_control/move_menu_section';
import SmpChat from './service/smp_chat/smp_chat';
import StarryNight from './service/starry_night/main';
import SummaryCardRepository from './service/firebase/summaryCard_repository';
import Youtube from './service/youtube/youtube';

import socketIo from 'socket.io-client';

import Smpchat from './components/common/smp_chat/smp_chat';

const authService = new AuthService();
const cloudinary = new Cloudinary();
const starryNight = new StarryNight();
const highLightMenu = new HighLightMenu();
const moveSection = new MoveSection();
const smpChat = new SmpChat(socketIo);
const summaryCard = new SummaryCardRepository();
const youtube = new Youtube(process.env.REACT_APP_YOUTUBE_API_KEY);

ReactDOM.render(
  // <React.StrictMode>
  <>
    <App
      authService={authService}
      cloudinary={cloudinary}
      highLightMenu={highLightMenu}
      moveSection={moveSection}
      summaryCard={summaryCard}
      starryNight={starryNight}
      youtube={youtube}
    />
    <Smpchat authService={authService} smpChat={smpChat} />
  </>,
  // </React.StrictMode>,
  document.getElementById('root')
);
