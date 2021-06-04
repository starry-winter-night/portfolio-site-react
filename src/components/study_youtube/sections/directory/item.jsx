import React, { memo, useEffect, useRef } from 'react';
import styles from './item.module.css';
import LoadContentsByObserve from '../../../../service/youtube/load_contents_by_observe';

const Item = memo(
  ({
    item, //
    onVideoListClick,
    onYoutubeLayerSet,
    youtube,
    query,
    videoList,
  }) => {
    const lastLiRef = useRef();
    const token = videoList?.contents?.nextPageToken;
    const id = videoList?.id;

    useEffect(() => {
      if (!Object.keys(videoList).length) return;

      const loadContentsByObserve = new LoadContentsByObserve(
        youtube,
        onYoutubeLayerSet,
        token,
        id,
        query
      );

      loadContentsByObserve.on(lastLiRef.current);
    }, [id, lastLiRef, onYoutubeLayerSet, query, token, videoList, youtube]);

    const video = item.snippet;
    const channelTitle = video.videoOwnerChannelTitle
      ? video.videoOwnerChannelTitle
      : video.channelTitle;

    const onClick = () => {
      onVideoListClick(item);
    };

    return (
      <li className={styles.youtubeList} onClick={onClick} ref={lastLiRef}>
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
  }
);

export default Item;
