import React from 'react';
import styles from './menu.module.css';

const Menu = ({ onMenuClick, item }) => {
  const onClick = () => {
    onMenuClick(item.title);
  };

  return (
    <li
      className={`${styles.menu} ${item.view === 'on' && styles.select}`}
      onClick={onClick}
    >
      {item.title}
    </li>
  );
};

export default Menu;
