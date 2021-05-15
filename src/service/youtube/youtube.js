import axios from 'axios';
class Youtube {
  constructor(key) {
    this.youtube = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3',
      params: { key: key },
    });
  }
  async developList(pageToken, maxResults = 25) {
    const id = process.env.REACT_APP_YOUTUBE_MYCHENNEL_ID;
    const data = {
      params: {
        part: 'snippet',
        playlistId: id,
        maxResults,
        type: 'video',
      },
    };

    if (pageToken === 'none') return;

    if (pageToken) {
      data.params.pageToken = pageToken;
    }

    const response = await this.youtube.get('playlistItems', data);
    return response.data;
  }

  async search(query, pageToken, maxResults = 25) {
    const data = {
      params: {
        part: 'snippet',
        q: query,
        maxResults,
        type: 'video',
      },
    };

    if (pageToken === 'none') return;

    if (pageToken) {
      data.params.pageToken = pageToken;
    }

    const response = await this.youtube.get('search', data);

    return response.data;
  }
}

export default Youtube;
