import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Navbar from './navbar/navbar';
import Maker from './maker/maker';
import Preview from './preview/preview';
import Loading from '../common/loading/loading';
import styles from './summary.module.css';

const Summary = ({ authService, cloudinary, cardRepo }) => {
  const history = useHistory();

  const auth = localStorage.getItem('state');
  const videoId = history.location.state?.videoId;
  const title = history.location.state?.title;

  const [cards, setCards] = useState({
    preview: {
      id: 'preview',
      bookmark: 'ivory',
    },
  });
  const [selectedCard, setSelectedCard] = useState({ id: 'preview' });
  const [loading, setLoading] = useState(null);

  const onUpdateCard = useCallback(
    (card) => {
      cardRepo.saveCard(auth, videoId, card);
    },
    [auth, cardRepo, videoId]
  );

  const onAddButton = useCallback(
    (currentId, card) => {
      const key = Date.now();

      const currentCard = { ...card, id: key };

      cardRepo.saveCard(auth, videoId, currentCard);

      const previewCard = { id: 'preview', bookmark: 'ivory' };

      cardRepo.saveCard(auth, videoId, previewCard);

      if (currentId !== 'preview') return;

      setSelectedCard({ id: key });
    },
    [auth, cardRepo, videoId]
  );

  const onEditButton = useCallback((cardId) => {
    setSelectedCard({ id: cardId });
  }, []);

  const onDeleteButton = useCallback(
    (card) => {
      cardRepo.deleteCard(auth, videoId, card);

      setSelectedCard({ id: 'preview' });
    },
    [auth, cardRepo, videoId]
  );

  useEffect(() => {
    authService.loginUserCheck((user) => {
      if (!user || !auth) {
        history.push('/login');
      } else {
        setLoading('on');
        cardRepo.readCard(auth, videoId, (result) => {
          if (result) {
            setCards(result);
          } else {
            setCards({
              preview: {
                id: 'preview',
                bookmark: 'ivory',
              },
            });
          }
          setLoading('off');
        });
      }
    });

    return () => {
      setCards({});
    };
  }, [auth, authService, history, cardRepo, videoId]);

  if (!videoId || !title) {
    history.push('/study');
  }
  return (
    <>
      {auth && (
        <>
          <Navbar authService={authService} />
          <main className={styles.main}>
            {loading === 'on' && <Loading styles={styles} />}
            {cards[selectedCard.id] && loading === 'off' && (
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
