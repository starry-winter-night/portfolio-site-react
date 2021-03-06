import React, { memo, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import styles from './home.module.css';

const Goback = memo(({ homeBox }) => {
  const history = useHistory();

  const handleGoHome = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <div className={homeBox} onClick={handleGoHome}>
      <FontAwesomeIcon className={styles.backIcon} icon={faHome} />
    </div>
  );
});

export default Goback;
