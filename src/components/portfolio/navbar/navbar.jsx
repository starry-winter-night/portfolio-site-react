import React, { memo, useRef, useEffect } from 'react';
import styles from './navbar.module.css';
import Logo from '../../common/logo/logo';
import RocketGuide from '../../../service/rocket_guide/rocketGuide';
const Navbar = memo(() => {
  const guide = useRef();

  useEffect(() => {
    const rocketGuide = new RocketGuide(guide.current);
    rocketGuide.start();
  }, [guide]);
  

  return (
    <nav className={styles.navbar}>
      <Logo logo={styles.logo} />

      <div className={styles.guide} data-id="guide" ref={guide}>
        <img
          src="/imgs/earth.png"
          alt="earth"
          className={styles.earth}
          data-id="earth"
        />
        <img
          src="/imgs/spaceShip-unscreen.gif"
          alt="spaceShip"
          className={styles.rocket}
          data-id="rocket"
        />
        <img
          src="/imgs/mars.png"
          alt="mars"
          className={styles.mars}
          data-id="mars"
        />
      </div>
    </nav>
  );
});

export default Navbar;
