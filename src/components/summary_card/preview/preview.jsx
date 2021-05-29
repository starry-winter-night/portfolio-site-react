import React, { forwardRef, useEffect } from 'react';
import styles from './preview.module.css';
import Card from './card';

const Preview = forwardRef(
  ({ cards, onEditCard, onDeleteCard, scrollTop }, ref) => {
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
        <p className={styles.info}>
          <span>Card Maker</span>에서 카드를 작성할 시 <span>실시간</span>으로
          저장됩니다. <br /> 카드의 추가 제작을 원하시면 <span>Add</span> 버튼을
          눌러주세요.
        </p>
        <ul>
          {Object.keys(cards).map((key) => (
            <Card
              key={key}
              card={cards[key]}
              onEditCard={onEditCard}
              onDeleteCard={onDeleteCard}
            />
          ))}
        </ul>
      </section>
    );
  }
);

export default Preview;
