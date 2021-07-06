import React, { memo } from 'react';
import styles from './menu.module.css';

const Menu = memo(({ menu, observe, moveSection, mainRef, portfolioRef }) => {
  const onClick = (e) => {
    const id = e.target.dataset.id;
    
    moveSection.start(id, mainRef.current.childNodes, portfolioRef.current);
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
