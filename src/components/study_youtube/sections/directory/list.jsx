import React, { memo } from 'react';
import Item from './item';
import styles from './list.module.css';
import Loading from '../../../common/loading/loading';

const List = memo(
  ({
    videoList,
    onVideoListClick,
    youtube,
    onYoutubeLayerSet,
    loading,
    etcToggleId,
    youtubeRepo,
  }) => {
    const list = videoList.contents?.videoList;
    return (
      <ul className={styles.videoList}>
        {loading.listLoading && <Loading styles={styles} />}
        {list &&
          list.map((item, index) => {
            return (
              <Item
                key={item.id}
                item={item}
                onVideoListClick={onVideoListClick}
                onYoutubeLayerSet={
                  index === list.length - 1 && onYoutubeLayerSet
                }
                youtube={index === list.length - 1 && youtube}
                videoList={index === list.length - 1 && videoList}
                etcToggleId={etcToggleId}
                youtubeRepo={youtubeRepo}
                videoListId={videoList.id}
                bookmark={
                  item.card &&
                  previewCheck(item.card[Object.keys(item.card)[0]]) &&
                  item.card[Object.keys(item.card)[0]].bookmark
                }
              />
            );
          })}
      </ul>
    );
  }
);
function previewCheck(card) {
  if (!card.title && !card.subTitle && !card.logoURL && !card.description) {
    return null;
  } else {
    return true;
  }
}

export default List;
