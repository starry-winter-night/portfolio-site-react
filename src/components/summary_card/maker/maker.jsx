import React from 'react';
import styles from './maker.module.css';
import Add from './add';

const Maker = ({ cards }) => (
  <section className={styles.maker}>
    <h1 className={styles.title}>Card Maker</h1>
    <ul>
      <Add />
    </ul>
  </section>
);

export default Maker;
