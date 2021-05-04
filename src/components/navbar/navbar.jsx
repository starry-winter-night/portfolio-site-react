import React, { memo, useRef, useEffect } from 'react';
import styles from './navbar.module.css';
import RocketGuide from '../../service/rocketGuide/rocketGuide';
const Navbar = memo(() => {
  const guide = useRef();
  const earth = useRef();
  const rocket = useRef();
  const mars = useRef();

  useEffect(() => {
    const ref = {
      guide: guide.current,
      earth: earth.current,
      rocket: rocket.current,
      mars: mars.current,
    };

    const rocketGuide = new RocketGuide(ref);
    rocketGuide.start();
  });

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <a href="https://smpark.dev">
          web <br />
          developer <br />
          smpark
        </a>
      </div>

      <div className={styles.guide} data-id="guide" ref={guide}>
        <img
          src="/imgs/earth.png"
          alt="earth"
          className={styles.earth}
          data-id="earth"
          ref={earth}
        />
        <img
          src="/imgs/spaceShip-unscreen.gif"
          alt="spaceShip"
          className={styles.rocket}
          data-id="rocket"
          ref={rocket}
        />
        <img
          src="/imgs/mars.png"
          alt="mars"
          className={styles.mars}
          data-id="mars"
          ref={mars}
        />
      </div>
    </nav>
  );
});

export default Navbar;
