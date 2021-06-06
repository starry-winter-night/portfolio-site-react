import React, { memo } from 'react';
import styles from './menu.module.css';

const Menu = memo(({ menu, observe, moveSection, sections, container }) => {
  const onClick = (e) => {
    const id = e.target.dataset.id;

    moveSection.start(id, sections, container);
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
