import firebaseApp from './firebase';

class YoutubeVideoRepository {
  saveVideo(userId, video, videoId) {
    firebaseApp.database().ref(`${userId}/my_list/${videoId}`).set(video);
  }

  deleteVideo(userId, videoId) {
    firebaseApp.database().ref(`${userId}/my_list/${videoId}`).remove();
  }

  readVideo(userId, cb) {
    firebaseApp
      .database()
      .ref(`${userId}/my_list`)
      .on('value', (snapshot) => {
        cb(snapshot.val());
      });
  }
}

export default YoutubeVideoRepository;
