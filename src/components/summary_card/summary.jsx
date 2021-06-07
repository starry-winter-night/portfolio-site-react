import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Goback from '../common/goback/goback';
import Logout from '../common/auth/logout';
import Maker from './maker/maker';
import Preview from './preview/preview';
import Loading from '../common/loading/loading';
import styles from './summary.module.css';

const Summary = ({ authService, cloudinary, summaryCard }) => {
  const history = useHistory();

  const auth = localStorage.getItem('state');
  const videoId = history.location.state?.videoId;
  const title = history.location.state?.title;

  const [cards, setCards] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [loading, setLoading] = useState(true);

  const onUpdateCard = useCallback(
    (card) => {
      setCards((item) => {
        const updated = { ...item };

        updated[card.id] = card;

        return updated;
      });

      summaryCard.saveCard(auth, videoId, card);
    },
    [auth, summaryCard, videoId]
  );

  const onAddButton = useCallback(
    (currentId) => {
      const key = Date.now();

      setCards((item) => {
        const updated = { ...item };

        updated[key] = { ...updated['preview'], id: key };

        summaryCard.saveCard(auth, videoId, updated[key]);

        updated['preview'] = { id: 'preview' };

        summaryCard.saveCard(auth, videoId, updated['preview']);

        return updated;
      });

      if (currentId !== 'preview') return;

      setSelectedCard({ id: key });
    },
    [auth, summaryCard, videoId]
  );

  const onEditButton = useCallback((cardId) => {
    setSelectedCard({ id: cardId });
  }, []);

  const onDeleteButton = useCallback(
    (cardId) => {
      setCards((item) => {
        const deleted = { ...item };

        summaryCard.deleteCard(auth, videoId, deleted[cardId]);

        delete deleted[cardId];

        return deleted;
      });

      setSelectedCard({ id: 'preview' });
    },
    [auth, summaryCard, videoId]
  );

  useEffect(() => {
    authService.loginUserCheck((user) => {
      if (!user || !auth) {
        history.push('/login');
      } else {
        setLoading(false);
        summaryCard.readCard(auth, videoId, (result) => {
          if (result) {
            setCards(result);

            setSelectedCard({ id: 'preview' });
          } else {
            setCards({
              preview: {
                id: 'preview',
              },
            });
            
            setSelectedCard({ id: 'preview' });
          }
          setLoading(true);
        });
      }
    });
  }, [auth, authService, history, summaryCard, videoId]);

  if (!videoId || !title) {
    history.push('/study');
  }

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
            {!loading && <Loading styles={styles} />}
            {cards[selectedCard.id] && (
              <>
                <Maker
                  cards={cards}
                  videoId={videoId}
                  onUpdateCard={onUpdateCard}
                  selectedCard={selectedCard}
                  cloudinary={cloudinary}
                />

                <Preview
                  cards={cards}
                  onAddButton={onAddButton}
                  onEditButton={onEditButton}
                  onDeleteButton={onDeleteButton}
                  selectedCard={selectedCard}
                />
              </>
            )}
          </main>
        </>
      )}
    </>
  );
};

export default Summary;
