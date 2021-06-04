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
    query,
    loading,
  }) => {
    const list = videoList.contents?.videoList;

    return (
      <ul>
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
                query={index === list.length - 1 && query}
                videoList={index === list.length - 1 && videoList}
              />
            );
          })}
      </ul>
    );
  }
);

export default List;
