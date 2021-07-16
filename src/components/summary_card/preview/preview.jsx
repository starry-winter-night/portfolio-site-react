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
          <span className={styles.span1}>Card Maker</span>에서 카드를 작성할 시
          <span className={styles.span2}> 실시간</span>으로 저장됩니다. <br />
          <span className={styles.span3}>Plus</span> 버튼을 누르면 새 카드가
          추가되며 기존카드를 삭제하실 수 있습니다. <br />
          💛영상은 자동으로 <span className={styles.span5}>My List</span>에
          <span className={styles.span6}> 저장</span>되며 작성된
          <span className={styles.span4}> Card</span>는
          <span className={styles.span5}> My List</span>에서 확인해 보실 수
          있습니다.💛
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
