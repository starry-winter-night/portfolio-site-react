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
    },
  });
  const [selectedCard, setSelectedCard] = useState({
    id: 'preview',
  });
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

  const onUpdateCard = useCallback((card) => {
    setCards((item) => {
      const updated = { ...item };

      updated[card.id] = card;

      return updated;
    });
  }, []);

  const onAddButton = useCallback((currentId) => {
    const key = Date.now();

    setCards((item) => {
      const updated = { ...item };

      updated[key] = { ...updated['preview'], id: key };

      updated['preview'] = { id: 'preview' };

      return updated;
    });

    if (currentId !== 'preview') return;
    setSelectedCard({ id: key });
  }, []);

  const onEditButton = useCallback((cardId) => {
    setSelectedCard({ id: cardId });
  }, []);

  const onDeleteButton = useCallback((cardId) => {
    setCards((item) => {
      const deleted = { ...item };

      delete deleted[cardId];

      return deleted;
    });

    setSelectedCard({ id: 'preview' });
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
        {cards[selectedCard.id] && (
          <Maker
            cards={cards}
            videoId={videoId}
            onUpdateCard={onUpdateCard}
            selectedCard={selectedCard}
            cloudinary={cloudinary}
            onLoadingStart={onLoadingStart}
          />
        )}

        <Preview
          cards={cards}
          onAddButton={onAddButton}
          onEditButton={onEditButton}
          onDeleteButton={onDeleteButton}
          onLoadingEnd={onLoadingEnd}
          selectedCard={selectedCard}
        />
      </main>
      {loading.state && <Loading styles={styles} />}
    </>
  );
};

export default Summary;
