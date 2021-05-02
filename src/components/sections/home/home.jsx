import React from 'react';
import styles from './home.module.css';

const Home = ({ menuRef }) => (
  <section id="home" className={`${styles.home} section`} ref={menuRef}>
    <h1 className={styles.title}>
      smpark's portfolio <br />
    </h1>
    <img src="/imgs/smpark.jpg" alt="owner" />

    <h3 className={styles.dscription}>
      Hello, <br />
      Welcome to my space <br />
      Have a nice trip
    </h3>
  </section>
);

export default Home;
