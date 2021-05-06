import React, { memo } from 'react';
import styles from './item.module.css';

const item = memo(({ item }) => {
  const video = item.snippet;
  console.log(video);
  return (
    <li className={styles.youtubeList}>
      <div className={styles.thumnailBox}>
        <img
          className={styles.thumbnail}
          src={video.thumbnails.medium.url}
          alt="thumbnail"
        ></img>
      </div>
      <div>
        <h3 className={styles.title}>{video.title}</h3>
        <p className={styles.content}>{video.videoOwnerChannelTitle}</p>
      </div>
    </li>
  );
});

export default item;
