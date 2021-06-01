import React, { useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Goback from '../common/goback/goback';
import Logout from '../common/auth/logout';
import Maker from './maker/maker';
import Preview from './preview/preview';
import Loading from '../common/loading/loading';

import styles from './summary.module.css';

const Summary = ({ onLogout, cloudinary }) => {
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

  const [selectedCard, setSelectedCard] = useState('preview');
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

  const onUpdateCard = (card) => {
    setCards((item) => {
      const updated = { ...item };

      updated[card.id] = card;

      return updated;
    });
  };

  const onAddCard = (card) => {
    setCards((item) => {
      const updated = { ...item };

      if (card.id === 'preview') {
        updated[card.id] = { ...updated['preview'], id: card.id };

        updated['preview'] = { id: 'preview' };
      } else {
        updated[card.id] = card;
        setSelectedCard('preview');
      }

      return updated;
    });
  };

  const onEditButton = useCallback((cardId) => {
    setSelectedCard(cardId);
  }, []);

  const onDeleteButton = useCallback((cardId) => {
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
          onAddCard={onAddCard}
          onUpdateCard={onUpdateCard}
          selectedCard={selectedCard}
          cloudinary={cloudinary}
          onLoadingStart={onLoadingStart}
        />
        <Preview
          cards={cards}
          onEditButton={onEditButton}
          onDeleteButton={onDeleteButton}
          onLoadingEnd={onLoadingEnd}
        />
      </main>
      {loading.state && <Loading styles={styles} />}
    </>
  );
};

export default Summary;
