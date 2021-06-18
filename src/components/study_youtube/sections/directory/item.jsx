import React, { memo, useEffect, useRef } from 'react';
import styles from './item.module.css';
import LoadContentsByObserve from '../../../../service/youtube/load_contents_by_observe';
import Dropbox from '../../../common/button/dropbox';
const Item = memo(
  ({
    item, //
    onVideoListClick,
    onYoutubeLayerSet,
    bookmark,
    youtube,
    videoList,
    etcToggleId,
    youtubeRepo,
    videoListId,
  }) => {
    const lastLiRef = useRef();
    const token = videoList?.contents?.nextPageToken;
    const id = videoList?.id;
    const dropboxList = ['삭제하기'];
    const auth = localStorage.getItem('state');

    useEffect(() => {
      if (!Object.keys(videoList).length) return;

      const loadContentsByObserve = new LoadContentsByObserve(
        youtube,
        onYoutubeLayerSet,
        token,
        id,
        localStorage.getItem('query')
      );

      loadContentsByObserve.on(lastLiRef.current);
    }, [id, lastLiRef, onYoutubeLayerSet, token, videoList, youtube]);

    const video = item.snippet;
    const channelTitle = video.videoOwnerChannelTitle
      ? video.videoOwnerChannelTitle
      : video.channelTitle;

    const onListClick = (e) => {
      if (!e.target.closest('svg')?.dataset.etcId) {
        onVideoListClick(item);
      }
    };

    const onDeleteClick = (text) => {
      let videoId = video?.resourceId?.videoId;

      if (!videoId) videoId = item.id;

      if (text === '삭제하기') {
        youtubeRepo.deleteVideo(auth, videoId);
      }
    };

    return (
      <li className={styles.youtubeList} onClick={onListClick} ref={lastLiRef}>
        <div className={styles.thumnailBox}>
          <img
            className={styles.thumbnail}
            src={video.thumbnails.medium.url}
            alt="thumbnail"
          ></img>
        </div>
        <div className={styles.contentBox}>
          <div
            className={
              bookmark && `${styles.card_bookmark} ${styles[bookmark]}`
            }
          ></div>
          <h3 className={styles.title}>{video.title}</h3>

          <p className={styles.content}>{channelTitle}</p>
        </div>

        {videoListId === 'mylist' && (
          <Dropbox
            list={dropboxList}
            listClick={onDeleteClick}
            styles={styles}
            dropboxId={item.id}
            etcToggleId={etcToggleId}
          />
        )}
      </li>
    );
  }
);

export default Item;
