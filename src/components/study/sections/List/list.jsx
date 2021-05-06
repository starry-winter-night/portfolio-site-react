import React from 'react';
import styles from './list.module.css';
import Item from './item';

const List = ({ items }) => {

  return (
    <section className={styles.list}>
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
};

export default List;
