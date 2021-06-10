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
import SummaryCardRepository from './service/firebase/summary_card_repository';
import YoutubeVideoRepository from './service/firebase/youtube_video_repository';
import Youtube from './service/youtube/youtube';

import socketIo from 'socket.io-client';

import Smpchat from './components/common/smp_chat/smp_chat';

const authService = new AuthService();
const cardRepo  = new SummaryCardRepository();
const cloudinary = new Cloudinary();
const highLightMenu = new HighLightMenu();
const moveSection = new MoveSection();
const smpChat = new SmpChat(socketIo);
const starryNight = new StarryNight();
const youtube = new Youtube(process.env.REACT_APP_YOUTUBE_API_KEY);
const youtubeRepo = new YoutubeVideoRepository();

ReactDOM.render(
  // <React.StrictMode>
  <>
    <App
      authService={authService}
      cardRepo={cardRepo}
      cloudinary={cloudinary}
      highLightMenu={highLightMenu}
      moveSection={moveSection}
      smpChat={smpChat}
      starryNight={starryNight}
      youtube={youtube}
      youtubeRepo={youtubeRepo}
    />
    <Smpchat smpChat={smpChat} />
  </>,
  // </React.StrictMode>,
  document.getElementById('root')
);
