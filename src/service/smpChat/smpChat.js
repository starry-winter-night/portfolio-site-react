class SmpChat {
  constructor(socketIo) {
    this.socketIo = socketIo;
  }

  load(userId) {
    if (userId) {
      const clientId = process.env.REACT_APP_CLIENTID;
      const apiKey = process.env.REACT_APP_API_KEY;

      const script = document.createElement('script');

      script.src = `http://localhost:5000/smpChat/chatService.js?CLIENTID=${clientId}`;
      script.defer = true;
      document.body.appendChild(script);

      const link = document.createElement('link');

      link.rel = 'stylesheet';
      link.href = 'http://localhost:5000/smpChat/chatService.css';
      document.body.appendChild(link);

      const position = {
        top: 'initial',
        bottom: '85px',
        left: '5%',
        right: 'initial',
      };

      script.addEventListener('load', () => {
        const chat = new window.smpChat.setting.chatService(
          clientId,
          apiKey,
          this.socketIo,
          position
        );

        chat.init(userId, 'smpChat');
      });
    }
  }
}

export default SmpChat;
