import React from 'react';
import Item from './item';
import styles from './list.module.css';

const list = ({ videoList, view, id, onList }) => {
  return (
    <ul className={`${styles.playList} ${view === 'on' && styles.view}`}>
      {videoList.map(
        (list) =>
          list.id === id &&
          list.content.map((item) => (
            <Item key={item.etag} item={item} onList={onList} type={id} />
          ))
      )}
    </ul>
  );
};

export default list;
