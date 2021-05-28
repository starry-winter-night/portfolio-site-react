import React from 'react';
import styles from './preview.module.css';
import Card from './card';

const Preview = ({ cards, onEditCard }) => (
  <section className={styles.preview}>
    <h1 className={styles.title}>Card Preview</h1>
    <ul>
      {Object.keys(cards).map((key) => (
        <Card key={key} card={cards[key]} onEditCard={onEditCard} />
      ))}
    </ul>
  </section>
);

export default Preview;
