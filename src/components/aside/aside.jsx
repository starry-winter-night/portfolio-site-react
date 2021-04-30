import React from 'react';
import styles from './aside.module.css';

const Aside = ({ FontAwesomeIcon, faBars }) => (
  <aside id="aside" className={styles.aside}>
    <button className={styles.menu__btn}>
      <FontAwesomeIcon icon={faBars} />
    </button>
    <ul className={styles.menu}>
      <li className={styles.menu_item} data-id="#home">
        Home
      </li>
      <li className={styles.menu_item} data-id="#about">
        About
      </li>
      <li className={styles.menu_item} data-id="#skills">
        Skills
      </li>
      <li className={styles.menu_item} data-id="#work">
        Works
      </li>
      <li className={styles.menu_item} data-id="#contact">
        Contact
      </li>
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

export default Aside;
