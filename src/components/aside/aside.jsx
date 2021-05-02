import React from 'react';
import styles from './aside.module.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Menu from './menu';

const Aside = ({ menuRef, FontAwesome }) => {
  const menus = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'skills', title: 'Skills' },
    { id: 'work', title: 'Work' },
    { id: 'contact', title: 'Contact' },
  ];

  return (
    <aside id="aside" className={styles.aside}>
      <button className={styles.menu__btn}>
        <FontAwesome icon={faBars} />
      </button>
      <ul className={styles.menu}>
        {menus.map((item) => (
          <Menu key={item.id} menu={item} menuRef={menuRef} />
        ))}
      </ul>
      <div className={styles.smpchat}>
        <img
          src="imgs/message.png"
          alt="chatting"
          className={styles.smpchat_icon}
        />
      </div>
    </aside>
  );
};

export default Aside;
