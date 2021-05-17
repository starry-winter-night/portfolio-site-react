import React from 'react';
import styles from './sections.module.css';
import Contents from './contents/contents';
import Directory from './directory/directory';

const Sections = ({
  setLayer,
  videoPlay,
  layer,
  onList,
  onMyList,
  youtube,
  query,
}) => {
  return (
    <div className={styles.container}>
      <Contents videoPlay={videoPlay} onMyList={onMyList} />
      <Directory
        layer={layer}
        onList={onList}
        youtube={youtube}
        setLayer={setLayer}
        query={query}
      />
    </div>
  );
};

export default Sections;
