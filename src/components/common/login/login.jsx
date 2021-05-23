import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import styles from './login.module.css';
import Logo from '../logo/logo';
import Goback from '../goback/goback';

const Login = ({ FontAwesome, authService, login, setLogin }) => {
  const history = useHistory();

  const onLogin = (e) => {
    let loginType = e.target.dataset.name;

    if (!loginType) {
      const li = e.target.closest('li');
      loginType = li.dataset.name;
    }

    authService
      .login(loginType)
      .then((data) => {
        // console.log(data.user.uid);

        setLogin(true);
        history.push('/study');
      })
      .catch((e) => {
        setLogin(false);

        e.code === 'auth/account-exists-with-different-credential' &&
          alert(
            `같은 이메일 주소가 등록되어 있습니다. 기존의 등록한 방식으로 로그인하여 주십시오. ${e.email}`
          );
      });
  };

  useEffect(() => {
    login === 'login' && history.push('/study');
  }, [login, history]);

  return (
    <section className={styles.section}>
      {login === 'nonLogin' && (
        <>
          <header className={styles.header}>
            <Goback FontAwesome={FontAwesome} backBox={styles.backBox} />
            <Logo logo={styles.logo} />
            <h1 className={styles.title}>Study Page Login</h1>
          </header>

          <ul className={styles.loginButtons}>
            <li data-name="Google" onClick={onLogin}>
              <button>Google</button>
            </li>
            <li data-name="Github" onClick={onLogin}>
              <button>Github</button>
            </li>
            <li data-name="Smpark" onClick={onLogin}>
              <button>SmPark</button>
            </li>
          </ul>
          <footer className={styles.footer}>
            <ul>
              <li>2021 software engineer smpark - All rights reserved</li>
            </ul>
          </footer>
        </>
      )}
    </section>
  );
};

export default Login;
