import React, { useState } from 'react';
import styles from './toggleArrow.module.css';

const ToggleArrow = ({ title = '', toggleDefault = false, children }) => {
  const [isOpen, setIsOpen] = useState(toggleDefault);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.toggle_arrow_container} ${isOpen ? styles.open : ''}`}>
      <div className={styles.toggle_container}>
        <div className={styles.toogle_title_container} onClick={toggleContent}>
          <h3 className={styles.title}>{title}</h3>
          <div className={`${styles.arrow} ${isOpen ? styles.open : ''}`}></div>
        </div>
        {isOpen && <div className={styles.content}>{children}</div>}
      </div>
    </div>
  );
};

export default ToggleArrow;
