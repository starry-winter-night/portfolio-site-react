import React from 'react';
import styles from './aside.module.css';
import Menu from './menu';

const Aside = ({ FontAwesomeIcon, faBars }) => {
  const menus = [
    { id: '#Home', title: 'Home' },
    { id: '#About', title: 'About' },
    { id: '#Skills', title: 'Skills' },
    { id: '#Work', title: 'Work' },
    { id: '#Contact', title: 'Contact' },
  ];

  return (
    <aside id="aside" className={styles.aside}>
      <button className={styles.menu__btn}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul className={styles.menu}>
        {menus.map((item) => (
          <Menu key={item.id} menu={item} />
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
