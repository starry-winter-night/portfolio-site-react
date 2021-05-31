import React, { useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Goback from '../common/goback/goback';
import Logout from '../common/auth/logout';
import Maker from './maker/maker';
import Preview from './preview/preview';
import styles from './summary.module.css';

const Summary = ({ onLogout, cloudinary }) => {
  console.log('in');

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
  const [loading, setLoading] = useState({
    state: false,
    key: null,
    type: null,
  });

  const location = useLocation();

  const videoId = location.state?.videoId;
  const title = location.state?.title;

  const history = useHistory();

  if (!videoId || !title) {
    history.push('/study');
  }

  const onAddOrUpdateCard = (card, type) => {
    setCards((item) => {
      const updated = { ...item };
      updated[card.id] = card;

      if (card.id !== 'preview') {
        updated['preview'] = {
          id: 'preview',
          title: '',
          subTitle: '',
          logoName: '',
          logoURL: '',
          bookmark: '',
          description: '',
        };
      }

      return updated;
    });

    if (type === 'Edit') {
      setCardId('preview');
    }
  };

  const onEditCard = useCallback((cardId) => {
    setCardId(cardId);
  }, []);

  const onDeleteCard = useCallback((cardId) => {
    setCards((item) => {
      const deleted = { ...item };

      delete deleted[cardId];

      return deleted;
    });
  }, []);

  const onLoadingStart = useCallback((id, type) => {
    setLoading((item) => {
      return { ...item, state: true, key: id, type };
    });
  }, []);

  const onLoadingEnd = useCallback(() => {
    setLoading((item) => {
      return { ...item, state: false, key: null, type: null };
    });
  }, []);

  return (
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
          cloudinary={cloudinary}
          onLoadingStart={onLoadingStart}
        />
        <Preview
          cards={cards}
          onEditCard={onEditCard}
          onDeleteCard={onDeleteCard}
          onLoadingEnd={onLoadingEnd}
          loading={loading}
          cardId={cardId}
        />
      </main>
    </>
  );
};

export default Summary;
