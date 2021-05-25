import React from 'react';
import { useHistory } from 'react-router';
import styles from './logout.module.css';
const Logout = ({ onLogout }) => {
  const history = useHistory();

  const hadleLogout = () => {
    onLogout();

    history.push('/login');
  };
  return (
    <button className={styles.logout} onClick={hadleLogout}>
      Logout
    </button>
  );
};

export default Logout;
