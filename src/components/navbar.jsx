import React from 'react';
import styles from './navbar.module.css';

const Navbar = () => (
  <nav className={styles.navbar}>
    <div className={styles.logo}>
      <a href="https://smpark.dev">
        web <br />
        developer <br />
        smpark
      </a>
      <div className={styles.github}></div>
      <div className={styles.email}></div>
    </div>

    <div className={styles.guide}>
      <img src="/imgs/earth.png" alt="earth" className={styles.earth} />
      <img
        src="/imgs/spaceShip-unscreen.gif"
        alt="spaceShip"
        className={styles.rocket}
      />
      <img src="/imgs/mars.png" alt="mars" className={styles.mars} />
    </div>
  </nav>
);

export default Navbar;
