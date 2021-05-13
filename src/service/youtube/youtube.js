import axios from 'axios';
class Youtube {
  constructor(key) {
    this.youtube = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3',
      params: { key: key },
    });
  }
  async developList() {
    const id = process.env.REACT_APP_YOUTUBE_MYCHENNEL_ID;

    const response = await this.youtube.get('playlistItems', {
      params: {
        part: 'snippet',
        playlistId: id,
        maxResults: 25,
        type: 'video',
      },
    });
    return response.data.items;
  }

  async search(query) {
    const response = await this.youtube.get('search', {
      params: {
        part: 'snippet',
        q: query,
        maxResults: 25,
        type: 'video',
      },
    });

    return response.data.items;
  }
}

export default Youtube;
