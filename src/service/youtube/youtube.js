class Youtube {
  constructor(key) {
    this.key = key;
    this.getRequestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
  }
  async developList() {
    const id = process.env.REACT_APP_YOUTUBE_MYCHENNEL_ID;

    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=25&type=video&key=${this.key}`,
      this.getRequestOptions
    );

    const result = await response.json();

    return result.items;
  }

  async search(query) {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${this.key}`,
      this.getRequestOptions
    );

    const result = await response.json();

    return result.items;
  }
}

export default Youtube;
