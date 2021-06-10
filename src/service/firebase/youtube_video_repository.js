import { firebaseDatabase } from './firebase';

class YoutubeVideoRepository {
  saveVideo(userId, video, videoId) {
    firebaseDatabase.ref(`${userId}/my_list/${videoId}`).set(video);
  }

  deleteVideo(userId, videoId) {
    firebaseDatabase.ref(`${userId}/my_list/${videoId}`).remove();
  }

  readVideo(userId, cb) {
    firebaseDatabase.ref(`${userId}/my_list`).on('value', (snapshot) => {
      cb(snapshot.val());
    });
  }
}

export default YoutubeVideoRepository;
