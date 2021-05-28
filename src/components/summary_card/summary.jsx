import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Goback from '../common/goback/goback';
import Logout from '../common/auth/logout';
import Maker from './maker/maker';
import Preview from './preview/preview';
import styles from './summary.module.css';

const Summary = ({ auth, onLogout }) => {
  const [cards, setCards] = useState({
    preview: {
      id: 'preview',
      title: '',
      subTitle: '',
      logoName: '',
      logoURL: '',
      bookmark: '',
      description: '',
    },
  });
  const [cardId, setCardId] = useState('preview');
  const [scrollTop, setScrollTop] = useState(0);

  const sectionRef = useRef();

  const location = useLocation();

  const videoId = location.state?.videoId;
  const title = location.state?.title;

  const history = useHistory();

  if (!videoId || !title) {
    history.push('/study');
  }

  useEffect(() => {
    if (auth === 'nonLogin') {
      history.push('/login');
    }
  }, [auth, history]);

  const onAddOrUpdateCard = (card, type) => {
    setCards((item) => {
      const updated = { ...item };
      updated[card.id] = card;

      if (card.id !== 'preview') {
        updated['preview'] = { id: 'preview' };
      }

      return updated;
    });

    if (type === 'Edit') {
      setCardId('preview');
    }

    if (type === 'Save') {
      setScrollTop(sectionRef.current.scrollHeight);
    }
  };

  const onEditCard = (cardId) => {
    setCardId(cardId);
  };

  const onDeleteCard = (cardId) => {
    setCards((item) => {
      const deleted = { ...item };

      delete deleted[cardId];

      return deleted;
    });
  };

  return (
    <>
      {auth === 'login' && (
        <>
          <nav className={styles.navbar}>
            <Goback backBox={styles.backBox} move="/study" />
            <div className={styles.logoBox}>
              <img className={styles.logo} src="imgs/note.png" alt="note"></img>
              <h3 className={styles.title}>Summary Card</h3>
            </div>
            <Logout onLogout={onLogout} />
          </nav>
          <main className={styles.main}>
            <Maker
              cards={cards}
              videoId={videoId}
              onAddOrUpdateCard={onAddOrUpdateCard}
              cardId={cardId}
            />
            <Preview
              cards={cards}
              onEditCard={onEditCard}
              onDeleteCard={onDeleteCard}
              ref={sectionRef}
              scrollTop={scrollTop}
            />
          </main>
        </>
      )}
    </>
  );
};

export default Summary;
