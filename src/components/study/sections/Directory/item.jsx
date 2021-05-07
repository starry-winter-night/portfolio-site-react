import React, { memo } from 'react';
import styles from './item.module.css';

const item = memo(({ item }) => {
  const video = item.snippet;
  const channelTitle = video.videoOwnerChannelTitle
    ? video.videoOwnerChannelTitle
    : video.channelTitle;

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
        <p className={styles.content}>{channelTitle}</p>
      </div>
    </li>
  );
});

export default item;
