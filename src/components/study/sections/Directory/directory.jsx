import React from 'react';
import styles from './directory.module.css';
import List from './list';

const Directory = ({ items, menus }) => {
  return (
    <section className={styles.directory}>
      {menus.map((item) => (
        <List key={item.id} items={items} view={item.view} id={item.id} />
      ))}
    </section>
  );
};

export default Directory;
