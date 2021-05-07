import React from 'react';
import styles from './menu.module.css';

const Menu = ({ title }) => {
  return <li className={styles.menu}>{title}</li>;
};

export default Menu;
