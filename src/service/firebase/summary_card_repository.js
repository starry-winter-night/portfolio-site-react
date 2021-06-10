import { firebaseDatabase } from './firebase';

class SummaryCardRepository {
  saveCard(userId, videoId, card) {
    firebaseDatabase
      .ref(`${userId}/summaryCard/${videoId}/${card.id}`)
      .set(card);
  }

  deleteCard(userId, videoId, card) {
    firebaseDatabase
      .ref(`${userId}/summaryCard/${videoId}/${card.id}`)
      .remove();
  }

  readCard(userId, videoId, cb) {
    firebaseDatabase
      .ref(`${userId}/summaryCard/${videoId}`)
      .on('value', (snapshot) => {
        cb(snapshot.val());
      });
  }
}

export default SummaryCardRepository;
