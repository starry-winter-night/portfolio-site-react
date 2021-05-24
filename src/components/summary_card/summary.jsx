import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import Goback from '../common/goback/goback';
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
        <nav className={styles.navbar}>
          <Goback FontAwesome={FontAwesome} backBox={styles.backBox} />
        </nav>
      )}
    </>
  );
};

export default Summary;
