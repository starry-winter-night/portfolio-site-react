class SmpChat {
  constructor(socketIo) {
    this.socketIo = socketIo;
    this.script = null;
    this.link = null;
    this.chatClassName = 'smpChat';
  }

  load(userId) {
    if (userId && !this.script && !this.link) {
      const clientId = process.env.REACT_APP_CLIENT_ID;
      const apiKey = process.env.REACT_APP_API_KEY;

      if (!this.script) this.script = document.createElement('script');
      this.script.src = `https://smp-resource.link/smpChat/chatService.js?CLIENTID=${clientId}`;
      this.script.defer = true;
      document.body.appendChild(this.script);

      if (!this.link) this.link = document.createElement('link');
      this.link.rel = 'stylesheet';
      this.link.href = 'https://smp-resource.link/smpChat/chatService.css';
      document.body.appendChild(this.link);

      const position = {
        icon: { x: '30px', y: '90%' },
        modal: { x: '30px', y: '20%' },
      };

      this.script.addEventListener('load', () => {
        const chat = new window.smpChat.setting.chatService(
          clientId,
          apiKey,
          this.socketIo
        );

        chat.init(userId, this.chatClassName);

        chat.setPosition(position);
      });
    }
  }

  clear() {
    if (this.script) {
      this.script.parentNode.removeChild(this.script);

      this.script = null;
    }

    if (this.link) {
      this.link.parentNode.removeChild(this.link);

      this.link = null;
    }

    const smpChat = document.querySelector(`.${this.chatClassName}`);

    if (smpChat) {
      while (smpChat.firstChild) {
        smpChat.removeChild(smpChat.firstChild);
      }
    }
  }
}

export default SmpChat;
