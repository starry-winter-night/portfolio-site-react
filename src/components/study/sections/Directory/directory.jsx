import React from 'react';
import styles from './directory.module.css';
import List from './list';

const Directory = ({ videoList, menus, onList }) => {
  return (
    <section className={styles.directory}>
      {menus.map((item) => (
        <List
          key={item.id}
          videoList={videoList}
          view={item.view}
          id={item.id}
          onList={onList}
        />
      ))}
    </section>
  );
};

export default Directory;
