import React, { useRef } from 'react';
import styles from './aside.module.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Menu from './menu';

const Aside = ({ FontAwesome }) => {
  const menus = [
    { id: '#Home', title: 'Home' },
    { id: '#About', title: 'About' },
    { id: '#Skills', title: 'Skills' },
    { id: '#Work', title: 'Work' },
    { id: '#Contact', title: 'Contact' },
  ];

  const menuRef = useRef();

  return (
    <aside id="aside" className={styles.aside}>
      <button className={styles.menu__btn}>
        <FontAwesome icon={faBars} />
      </button>
      <ul className={styles.menu} ref={menuRef}>
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
