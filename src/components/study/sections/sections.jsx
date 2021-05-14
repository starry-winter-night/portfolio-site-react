import React from 'react';
import styles from './sections.module.css';
import Contents from './contents/contents';
import Directory from './directory/directory';

const Sections = ({ videoList, videoPlay, menus, onList, onMyList }) => {
  return (
    <div className={styles.container}>
      <Contents videoPlay={videoPlay} onMyList={onMyList} />
      <Directory videoList={videoList} menus={menus} onList={onList} />
    </div>
  );
};

export default Sections;
