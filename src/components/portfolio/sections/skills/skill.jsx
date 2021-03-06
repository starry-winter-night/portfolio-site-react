import React from 'react';
import styles from './skill.module.css';

const skill = ({ skillList }) => {
  return (
    <li className={styles.skill}>
      <div className={styles.description}>
        <span>{skillList.title}</span>
        <span>{skillList.bar}</span>
      </div>
      <div className={styles.bar}>
        <div style={{ width: skillList.bar }} className={styles.value}></div>
      </div>
    </li>
  );
};

export default skill;
