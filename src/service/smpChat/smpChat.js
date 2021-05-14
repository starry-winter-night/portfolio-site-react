class SmpChat {
  constructor(socketIo) {
    this.socketIo = socketIo;
  }

  load(userId) {
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

    script.addEventListener('load', () => {
      const chat = new window.smpChat.setting.chatService(
        clientId,
        apiKey,
        this.socketIo
      );

      chat.init(userId, 'smpChat');
    });
  }
}

export default SmpChat;
