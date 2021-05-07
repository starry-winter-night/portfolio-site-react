import React from 'react';
import styles from './sections.module.css';
import Contents from './Contents/contents';
import Directory from './Directory/directory';

const Sections = ({ items, menus }) => {
  return (
    <div className={styles.container}>
      <Contents items={items[0]} />
      <Directory items={items} menus={menus} />
    </div>
  );
};

export default Sections;
