import React, { memo } from 'react';
import styles from './menu.module.css';

const Menu = memo(({ title, onMenu }) => {
  const handleClickMenu = () => {
    onMenu(title);
  };

  return (
    <li className={styles.menu} onClick={handleClickMenu}>
      {title}
    </li>
  );
});

export default Menu;
