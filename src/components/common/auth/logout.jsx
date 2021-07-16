import React, { memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './logout.module.css';

const Logout = memo(({ authService, style }) => {
  const history = useHistory();

  const hadleLogout = useCallback(() => {
    localStorage.clear();

    authService.logout();

    history.push({
      pathname: '/login',
    });
    
  }, [authService, history]);
  
  return (
    <button className={style ? style : styles.logout} onClick={hadleLogout}>
      Logout
    </button>
  );
});

export default Logout;
