import React, { forwardRef, useEffect } from 'react';
import styles from './preview.module.css';
import Card from './card';

const Preview = forwardRef(({ cards, onEditCard, scrollTop }, ref) => {
  const section = ref.current;

  useEffect(() => {
    return () => {
      if (section) {
        section.scrollTop = scrollTop;
      }
    };
  }, [scrollTop, section]);

  return (
    <section ref={ref} className={styles.preview}>
      <h1 className={styles.title}>Card Preview</h1>
      <ul>
        {Object.keys(cards).map((key) => (
          <Card key={key} card={cards[key]} onEditCard={onEditCard} />
        ))}
      </ul>
    </section>
  );
});

export default Preview;
