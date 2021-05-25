import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import Goback from '../common/goback/goback';
import Logout from '../common/auth/logout';
import Maker from './maker/maker';
import Preview from './preview/preview';
import styles from './summary.module.css';

const Summary = ({ FontAwesome, auth, onLogout }) => {
  const history = useHistory();

  useEffect(() => {
    if (auth === 'nonLogin') {
      history.push('/login');
    }
  }, [auth, history]);

  const location = useLocation();

  const videoId = location.state?.videoId;
  const title = location.state?.title;

  if (!videoId || !title) {
    history.push('/study');
  }

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
            <Maker />
            <Preview />
          </main>
        </>
      )}
    </>
  );
};

export default Summary;
