import React, { memo } from 'react';
import styles from './menu.module.css';

const Menu = memo(({ menu, menuRef }) => {
  const onMenuClick = (e) => {
    const currId = e.target.dataset.id;
    const sections = menuRef.current;

    sections.forEach((item, index) => {
      if (item.id === currId) {
        index === 0 ? moveScrollHome() : moveScrollMenu(item);
      }
    });

    function moveScrollMenu(item) {
      item.scrollIntoView({ behavior: 'smooth' });
    }

    function moveScrollHome() {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  return (
    <li className={styles.menu_item} data-id={menu.id} onClick={onMenuClick}>
      {menu.title}
    </li>
  );
});

export default Menu;
