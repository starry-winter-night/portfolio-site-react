import React, { useCallback, useEffect, useState } from 'react';
import styles from './directory.module.css';
import List from './list';
import InfiniteScroll from '../../../../service/infiniteScroll/infiniteScroll.js';

const Directory = ({
  videoList,
  menus,
  onList,
  youtube,
  setVideoList,
  query,
}) => {
  const [LastElement, setLastElement] = useState(null);

  useEffect(() => {
    menus.forEach((item) => {
      if (item.view === 'on') {
        const infiniteScroll = new InfiniteScroll(
          youtube,
          videoList,
          setVideoList,
          item.id,
          query
        );

        infiniteScroll.on(LastElement);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LastElement, menus]);

  const getLastRef = useCallback((dom) => {
    setLastElement(dom);
  }, []);

  return (
    <section className={styles.directory}>
      {menus.map((item) => (
        <List
          key={item.id}
          videoList={videoList}
          view={item.view}
          id={item.id}
          onList={onList}
          lastRef={getLastRef}
        />
      ))}
    </section>
  );
};

export default Directory;
