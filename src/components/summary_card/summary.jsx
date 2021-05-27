import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Goback from '../common/goback/goback';
import Logout from '../common/auth/logout';
import Maker from './maker/maker';
import Preview from './preview/preview';
import styles from './summary.module.css';

const Summary = ({ FontAwesome, auth, onLogout }) => {
  const [cards, setCards] = useState(
    {
      1: {
        id: '1',
        title: 'javascript',
        subTitle: 'object 이해하기',
        logoName: 'javascript',
        logoURL: 'imgs/note.png',
        description: `이전 영상(10.9)과이 영상 (10.10) 완성된 코드는 다음영상 (10.11) 에서 함께 공유해 드릴께요 :) id: '2',
        title: 'react',
        subTitle: 'map 이해하기',
        logoName: 'react',
        logoURL: 'imgs/mars.png'`,
      },
    }

    // {
    //   id: '2',
    //   title: 'react',
    //   subTitle: 'map 이해하기',
    //   logoName: 'react',
    //   logoURL: 'imgs/mars.png',
    // },
    // {
    //   id: '3',
    //   title: 'nodejs',
    //   subTitle: 'array 이해하기',
    //   logoName: 'nodejs',
    //   logoURL: 'imgs/earth.png',
    // },
  );

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

  const onAddCard = (card) => {
    setCards((item) => {
      const updated = { ...item };
      updated[card.id] = card;

      return updated;
    });
  };

  const onUpdateCard = (id, card) => {
    console.log(id);
    if (id === 'preview') {
      setCards((item) => {
        const updated = { ...item };
        updated[id] = card;
  
        return updated;
      });
    }
  };

  return (
    <>
      {auth === 'login' && (
        <>
          <nav className={styles.navbar}>
            <Goback
              FontAwesome={FontAwesome}
              backBox={styles.backBox}
              move="/study"
            />
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
              cardId={null}
            />
            <Preview cards={cards} />
          </main>
        </>
      )}
    </>
  );
};

export default Summary;
