import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

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

  return login && <div className={`smpChat`}></div>;
};

export default SmpChat;
