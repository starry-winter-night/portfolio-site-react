import React from 'react';
import styles from './sections.module.css';
import Contents from './Contents/contents';
import Directory from './Directory/directory';

const Sections = ({ videoList, videoPlay, menus, onList }) => {
  return (
    <div className={styles.container}>
      <Contents videoPlay={videoPlay} />
      <Directory videoList={videoList} menus={menus} onList={onList} />
    </div>
  );
};

export default Sections;
