import React,{ memo }  from 'react';
import styles from './menu.module.css';

const Menu = memo(({ menu }) => (
  <li className={styles.menu_item} data-id={menu.id}>
    {menu.title}
  </li>
));

export default Menu;
