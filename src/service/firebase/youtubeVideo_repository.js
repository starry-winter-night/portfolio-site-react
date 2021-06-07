import firebaseApp from './firebase';

class youtubeVideoRepository {
  saveVideo(userId, videoId) {
    firebaseApp.database().ref(`${userId}/${videoId}`).set(videoId);
  }

  deleteVideo(userId, videoId) {
    firebaseApp.database().ref(`${userId}/${videoId}`).remove();
  }
}

export default youtubeVideoRepository;
