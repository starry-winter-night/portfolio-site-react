import React, { useEffect, useRef } from 'react';
import styles from './item.module.css';

const Item = ({ item, onList, onMenu }) => {
  const lastListRef = useRef();
  const video = item.snippet;
  const channelTitle = video.videoOwnerChannelTitle
    ? video.videoOwnerChannelTitle
    : video.channelTitle;

  const handleClickVideoList = () => {
    onList(item);
  };

  useEffect(() => {
    if (onMenu) {
      const element = lastListRef.current;
      onMenu("Smpark's Picks", element);
    }
  }, [onMenu, lastListRef]);

  return (
    <li
      className={styles.youtubeList}
      onClick={handleClickVideoList}
      ref={lastListRef}
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
};

export default Item;
