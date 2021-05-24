import React, { memo } from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import styles from './goback.module.css';

const Goback = memo(({ FontAwesome, backBox }) => {
  const history = useHistory();

  const handleGoBack = () => {
    history.push('/');
  };

  return (
    <div className={backBox}>
      <FontAwesome
        className={styles.backIcon}
        icon={faArrowLeft}
        onClick={handleGoBack}
      />
    </div>
  );
});

export default Goback;
