import React, { memo } from 'react';
import Item from './item';
import styles from './list.module.css';

const List = memo(({ videoList, onList, onMenu }) => {
  return (
    <ul className={`${styles.playList}`}>
      {videoList.map((item, index) => {
        if (index === videoList.length - 1) {
          return (
            <Item key={item.id} item={item} onList={onList} onMenu={onMenu} />
          );
        } else {
          return <Item key={item.id} item={item} onList={onList} />;
        }
      })}
    </ul>
  );
});

export default List;
