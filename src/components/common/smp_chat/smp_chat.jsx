import React from 'react';

const SmpChat = ({ smpChat }) => {
  const auth = localStorage.getItem('state');

  if (auth) {
    smpChat.load(auth);
  }

  return <div className={`smpChat`}></div>;
};

export default SmpChat;
