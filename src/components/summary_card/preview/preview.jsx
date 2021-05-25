import React from 'react';
import styles from './preview.module.css';
import Card from './card';

const Preview = ({ cards }) => (
  <section className={styles.preview}>
    <h1 className={styles.title}>Card Preview</h1>
    <ul>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </ul>
  </section>
);

export default Preview;
