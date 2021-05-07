import React from 'react';
import Item from './item';
import styles from './list.module.css';

const list = ({ items, view, id }) => {
  return (
    <ul
      className={`${styles.playList} ${view === 'on' && styles.view}`}
      data-id={id}
    >
    
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default list;
