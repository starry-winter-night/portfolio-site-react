import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './logout.module.css';
const Logout = memo(({ authService }) => {
  const history = useHistory();

  const hadleLogout = () => {
    localStorage.clear();
    authService.logout();
    history.push({
      pathname: '/login',
    });
  };
  return (
    <button className={styles.logout} onClick={hadleLogout}>
      Logout
    </button>
  );
});

export default Logout;
