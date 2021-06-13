import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import styles from './goback.module.css';

const Goback = memo(({ backBox, move }) => {
  const history = useHistory();

  const handleGoBack = () => {
    if (move) {
      history.push(move);
    } else {
      history.push('/');
    }
  };

  return (
    <div className={backBox} onClick={handleGoBack}>
      <FontAwesomeIcon className={styles.backIcon} icon={faArrowLeft} />
    </div>
  );
});

export default Goback;
