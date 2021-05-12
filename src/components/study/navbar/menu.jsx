import React, { memo } from 'react';
import styles from './menu.module.css';

const Menu = memo(({ onMenu, item }) => {
  const handleClickMenu = () => {
    onMenu(item.title);
  };

  return (
    <li
      className={`${styles.menu} ${item.view === 'on' && styles.select}`}
      onClick={handleClickMenu}
    >
      {item.title}
    </li>
  );
});

export default Menu;
