import React from 'react';
import styles from './directory.module.css';
import List from './list';

const Directory = ({ layer, onList, onMenu }) => {
  console.log(layer);
  return (
    <section className={styles.directory}>
      {layer.map(
        (item) =>
          item.view === 'on' && (
            <List
              key={item.id}
              videoList={item.contents.videoList}
              id={item.id}
              onList={onList}
              onMenu={onMenu}
            />
          )
      )}
    </section>
  );
};

export default Directory;
