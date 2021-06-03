import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Goback from '../common/goback/goback';
import Logout from '../common/auth/logout';
import Maker from './maker/maker';
import Preview from './preview/preview';
import styles from './summary.module.css';

const Summary = ({ authService, cloudinary }) => {
  const [cards, setCards] = useState({
    preview: {
      id: 'preview',
    },
  });
  const [selectedCard, setSelectedCard] = useState({
    id: 'preview',
  });
  const history = useHistory();

  const auth = localStorage.getItem('state');
  const videoId = history.location.state?.videoId;
  const title = history.location.state?.title;

  useEffect(() => {
    authService.loginUserCheck((user) => {
      if (!user || !auth) history.push('/login');
    });
  }, [auth, authService, history]);

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

  return (
    <>
      {auth && (
        <>
          <nav className={styles.navbar}>
            <Goback backBox={styles.backBox} move="/study" />
            <div className={styles.logoBox}>
              <img className={styles.logo} src="imgs/note.png" alt="note"></img>
              <h3 className={styles.title}>Summary Card</h3>
            </div>
            <Logout authService={authService} />
          </nav>
          <main className={styles.main}>
            {cards[selectedCard.id] && (
              <Maker
                cards={cards}
                videoId={videoId}
                onUpdateCard={onUpdateCard}
                selectedCard={selectedCard}
                cloudinary={cloudinary}
              />
            )}
            <Preview
              cards={cards}
              onAddButton={onAddButton}
              onEditButton={onEditButton}
              onDeleteButton={onDeleteButton}
              selectedCard={selectedCard}
            />
          </main>
        </>
      )}
    </>
  );
};

export default Summary;
