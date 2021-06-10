import firebaseApp from './firebase';

class SummaryCardRepository {
  saveCard(userId, videoId, card) {
    firebaseApp
      .database()
      .ref(`${userId}/summaryCard/${videoId}/${card.id}`)
      .set(card);
  }

  deleteCard(userId, videoId, card) {
    firebaseApp
      .database()
      .ref(`${userId}/summaryCard/${videoId}/${card.id}`)
      .remove();
  }

  readCard(userId, videoId, cb) {
    firebaseApp
      .database()
      .ref(`${userId}/${videoId}`)
      .on('value', (snapshot) => {
        cb(snapshot.val());
      });
  }
}

export default SummaryCardRepository;
