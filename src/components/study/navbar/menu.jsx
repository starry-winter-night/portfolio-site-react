import React, { memo } from 'react';
import styles from './menu.module.css';

const Menu = memo(({ title, onMenu, item }) => {
  const handleClickMenu = () => {
    onMenu(title);
  };

  return (
    <li
      className={`${styles.menu} ${item.view === 'on' && styles.select}`}
      onClick={handleClickMenu}
    >
      {title}
    </li>
  );
});

export default Menu;
