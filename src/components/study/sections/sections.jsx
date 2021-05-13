import React from 'react';
import styles from './sections.module.css';
import Contents from './contents/contents';
import Directory from './directory/directory';

const Sections = ({ videoList, videoPlay, menus, onList }) => {
  return (
    <div className={styles.container}>
      <Contents videoPlay={videoPlay} />
      <Directory videoList={videoList} menus={menus} onList={onList} />
    </div>
  );
};

export default Sections;
