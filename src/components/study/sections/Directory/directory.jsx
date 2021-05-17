import React from 'react';
import styles from './directory.module.css';
import List from './list';

const Directory = ({ layer, onList, youtube, setLayer, query }) => {
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
              token={item.contents.nextPageToken}
              youtube={youtube}
              setLayer={setLayer}
              query={query}
            />
          )
      )}
    </section>
  );
};

export default Directory;
