import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import styles from './login.module.css';
import Logo from '../Logo/logo';

const Login = ({ firebase, loginState }) => {
  const history = useHistory();

  const onLogin = (e) => {
    let loginType = e.target.dataset.name;

    if (!loginType) {
      const li = e.target.closest('li');
      loginType = li.dataset.name;
    }

    firebase
      .login(loginType)
      .then((data) => {
        // console.log(data.user.uid);
        history.push('/study');
      })
      .catch((e) => {
        e.code === 'auth/account-exists-with-different-credential' &&
          alert(
            `같은 이메일 주소가 등록되어 있습니다. 기존의 등록한 방식으로 로그인하여 주십시오. ${e.email}`
          );
      });
  };

  useEffect(() => {
    firebase.loginUserCheck((user) => {
      if (user) {
        history.push('/study');
      }
    });
  }, [firebase, history]);

  return (
    <section className={styles.section}>
      {loginState.state === 'nonLogin' && (
        <>
          <header className={styles.header}>
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
