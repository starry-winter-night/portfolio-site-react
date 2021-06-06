import React, { memo } from 'react';
import styles from './menu.module.css';

const Menu = memo(({ menu, observe, onMenuClick }) => {
  const onClick = (e) => {
    onMenuClick(e.target.dataset.id);
  };

  return (
    <li
      className={observe === menu.id ? styles.itemView : styles.item}
      data-id={menu.id}
      onClick={onClick}
    >
      {menu.title}
    </li>
  );
});

export default Menu;
