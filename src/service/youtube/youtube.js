class Youtube {
  constructor(key) {
    this.key = key;
    this.getRequestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
  }
  async playList() {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails%2Cstatus&playlistId=PLng3cGDHQcFTXjUchGUbih7JuX3ZIp5C6&key=${this.key}`,
      this.getRequestOptions
    );

    const result = await response.json();

    return result.items;
  }
}

export default Youtube;
