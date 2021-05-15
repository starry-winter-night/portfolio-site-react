import React, { memo } from 'react';
import styles from './item.module.css';

const item = memo(({ item, onList, lastRef = null }) => {
  const video = item.snippet;
  const channelTitle = video.videoOwnerChannelTitle
    ? video.videoOwnerChannelTitle
    : video.channelTitle;

  const handleClickVideoList = () => {
    onList(item);
  };

  return (
    <li
      className={styles.youtubeList}
      onClick={handleClickVideoList}
      ref={lastRef}
    >
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
