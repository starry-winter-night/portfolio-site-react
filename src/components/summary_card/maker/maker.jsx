import React from 'react';
import styles from './maker.module.css';
import Edit from './edit';

const Maker = (props) => (
  <section className={styles.maker}>
    <h1 className={styles.title}>Card Maker</h1>
    <Edit />
  </section>
);

export default Maker;
