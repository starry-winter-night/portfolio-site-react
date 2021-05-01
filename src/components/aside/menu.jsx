import React, { memo } from 'react';
import styles from './menu.module.css';

const Menu = memo(({ menu, menuRef }) => {
  const onMenuClick = (e) => {
    console.log(e.target);
    const currId = e.target.dataset.id;
    const firstMenuId = menuRef.current.children[0].dataset.id;

    currId === firstMenuId ? moveScrollMenu(currId) : moveScrollHome();

    function moveScrollMenu(id) {
      const selector = document.querySelector(id);
      selector.scrollIntoView({ behavior: 'smooth' });
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
