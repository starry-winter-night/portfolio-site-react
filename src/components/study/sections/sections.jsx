import React from 'react';
import styles from './sections.module.css';
import Contents from './Contents/contents';
import List from './List/list';

const Sections = ({ items }) => {
  return (
    <div className={styles.container}>
      <Contents items={items[0]} />
      <List items={items} />
    </div>
  );
};

export default Sections;
