import React from 'react';
import styles from './menu.module.css';

const Menu = ({ onMenuClick, view, title }) => {
  const onClick = () => {
    onMenuClick(title);
  };

  return (
    <li
      className={`${styles.menu} ${view === 'on' && styles.select}`}
      onClick={onClick}
    >
      {title}
    </li>
  );
};

export default Menu;
