import React, { memo } from 'react';
import styles from './logout.module.css';
const Logout = memo(({ authService }) => {
  const hadleLogout = () => {
    localStorage.clear();
    authService.logout();
    
  };
  return (
    <button className={styles.logout} onClick={hadleLogout}>
      Logout
    </button>
  );
});

export default Logout;
