import React, { memo } from 'react';
import Item from './item';
import styles from './list.module.css';

const List = memo(({ videoList, view, id, onList, lastRef }) => {
  return (
    <ul className={`${styles.playList} ${view === 'on' && styles.view}`}>
      {videoList.map(
        (list) =>
          list.id === id &&
          list.content.map((item, index) => {
            if (index === list.content.length - 1) {
              return (
                <Item
                  key={item.id}
                  item={item}
                  onList={onList}
                  type={id}
                  lastRef={lastRef}
                />
              );
            } else {
              return (
                <Item key={item.etag} item={item} onList={onList} type={id} />
              );
            }
          })
      )}
    </ul>
  );
});

export default List;
