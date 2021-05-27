import React from 'react';
import styles from './maker.module.css';
import Add from './add';
import Video from '../../common/youtube/video';

const Maker = ({ cards, videoId, onAddCard, onUpdateCard, cardId }) => (
  <section className={styles.maker}>
    <h1 className={styles.title}>Card Maker</h1>
    <Video videoId={videoId} height="400px" />
    <ul>
      <Add
        cards={cards}
        selectCard={cardId}
        onAddCard={onAddCard}
        onUpdateCard={onUpdateCard}
      />
    </ul>
  </section>
);

export default Maker;
