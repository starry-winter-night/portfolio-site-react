import React from 'react';
import styles from './info.module.css';
const info = ({ info }) => {
  return (
    <div className={styles.content}>
      <h2>{info.title}</h2>
      <a href={info.url} target="noopener">
        {info.icon}
      </a>
      <p>{info.content}</p>
    </div>
  );
};

export default info;
