import React, { memo } from 'react';
import styles from './preview.module.css';
import Card from './card';

const Preview = memo(
  ({
    cards,
    onEditButton,
    onDeleteButton,
    onLoadingEnd,
    onAddButton,
    selectedCard,
  }) => {
    return (
      <section className={styles.preview}>
        <h1 className={styles.title}>Card Preview</h1>
        <p className={styles.info}>
          <span>Card Maker</span>에서 카드를 작성할 시 <span>실시간</span>으로
          저장됩니다. <br /> 카드의 추가 제작을 원하시면 <span>Plus</span>{' '}
          버튼을 눌러주세요.
        </p>

        {Object.keys(cards)
          .sort()
          .map((key) => (
            <Card
              key={key}
              card={cards[key]}
              onAddButton={onAddButton}
              onEditButton={onEditButton}
              onDeleteButton={onDeleteButton}
              onLoadingEnd={onLoadingEnd}
              selectedCard={selectedCard}
              styles={styles}
            />
          ))}
      </section>
    );
  }
);

export default Preview;
