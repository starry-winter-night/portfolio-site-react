import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import styles from './smpChat.module.css';

const SmpChat = ({ authService, smpChat }) => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    authService.loginUserCheck((user) => {
      if (user) {
        setLogin(true);
        smpChat.load(user.uid);
      } else {
        setLogin(false);
      }
    });
  }, [authService, smpChat]);

  return login && <div className={`${styles.smpChat} smpChat`}></div>;
};

export default SmpChat;
