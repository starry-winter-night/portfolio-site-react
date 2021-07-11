import React, { memo } from 'react';
import Goback from '../../common/move/goback';
import Logout from '../../common/auth/logout';
import styles from './navbar.module.css';

const Navbar = memo(({authService}) => {
  return (
    <nav className={styles.navbar}>
      <Goback backBox={styles.backBox} move="/study" />
      <div className={styles.logoBox}>
        <img className={styles.logo} src="imgs/note.png" alt="note"></img>
        <h3 className={styles.title}>Summary Card</h3>
      </div>
      <Logout authService={authService} />
    </nav>
  );
});

export default Navbar;
