import React from 'react';
import styles from './maker.module.css';
import Write from './write';
import Video from '../../common/youtube/video';

const Maker = ({ cards, videoId, onAddOrUpdateCard, cardId, cloudinary }) => (
  <section className={styles.maker}>
    <h1 className={styles.title}>Card Maker</h1>
    <Video videoId={videoId} height="400px" />
    <ul>
      <Write
        cards={cards}
        selectCardId={cardId}
        onAddOrUpdateCard={onAddOrUpdateCard}
        cloudinary={cloudinary}
      />
    </ul>
  </section>
);

export default Maker;
