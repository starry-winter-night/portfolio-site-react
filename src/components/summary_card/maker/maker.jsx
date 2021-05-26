import React from 'react';
import styles from './maker.module.css';
import Add from './add';
import Video from '../../common/youtube/video';

const Maker = ({ cards, videoId, onAdd }) => (
  <section className={styles.maker}>
    <h1 className={styles.title}>Card Maker</h1>
    <Video videoId={videoId} height="400px" />
    <ul>
      <Add onAdd={onAdd} />
    </ul>
  </section>
);

export default Maker;
