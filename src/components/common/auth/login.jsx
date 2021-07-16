import React, { memo, useEffect } from 'react';
import { useHistory } from 'react-router';
import styles from './login.module.css';
import Logo from '../logo/logo';
import Home from '../move/home';

const Login = memo(({ authService, smpAuth, smpChat }) => {
  const history = useHistory();
  const auth = localStorage.getItem('state');
  const params = new URLSearchParams(window.location.search);

  localStorage.setItem('code', params.get('code'));
  localStorage.setItem('smp_state', params.get('state'));

  const onClickLoginButton = (e) => {
    let loginType = e.target.dataset.name;

    if (!loginType) {
      const li = e.target.closest('li');

      loginType = li.dataset.name;
    }

    if (loginType === 'Smpark') {
      smpAuth.login();
    } else {
      authService
        .login(loginType)
        .then((data) => {
          localStorage.setItem('state', data.user.uid);
        })
        .catch((e) => {
          e.code === 'auth/account-exists-with-different-credential' &&
            alert(
              `같은 이메일 주소가 등록되어 있습니다. 기존의 등록한 방식으로 로그인하여 주십시오. ${e.email}`
            );

          localStorage.clear();
        });
    }
  };

  useEffect(() => {
    const code = localStorage.getItem('code') || null;
    const state = localStorage.getItem('smp_state') || null;

    if (code !== 'null' && state !== 'null') {
      smpAuth
        .token(code, state)
        .then((result) => {
          localStorage.clear();
          authService.customLogin(result.token, (user) => {
            window.close();

            localStorage.setItem('state', user.uid);
          });
        })
        .catch((e) => {
          localStorage.clear();
          throw Error(e);
        });
    }
  }, [authService, smpAuth]);

  useEffect(() => {
    authService.loginUserCheck((user) => {
      if (user) {
        const uid = user.uid;
        if (!auth) {
          localStorage.setItem('state', uid);
        }

        smpChat.load(uid);

        history.push({
          pathname: '/study',
          state: { uid },
        });
      } else {
        if (auth) {
          localStorage.clear();
        }

        smpChat.clear();
      }
    });
  }, [auth, authService, history, smpChat]);

  return (
    <>
      {!auth && (
        <section className={styles.section}>
          <header className={styles.header}>
            <Home homeBox={styles.homeBox} />
            <Logo logo={styles.logo} />
            <h1 className={styles.title}>Study Page Login</h1>
          </header>

          <ul className={styles.loginButtons}>
            <li data-name="Google" onClick={onClickLoginButton}>
              <button>Google</button>
            </li>
            <li data-name="Github" onClick={onClickLoginButton}>
              <button>Github</button>
            </li>
            <li data-name="Smpark" onClick={onClickLoginButton}>
              <button>SmPark</button>
            </li>
          </ul>
          <footer className={styles.footer}>
            <ul>
              <li>2021 software engineer smpark - All rights reserved</li>
            </ul>
          </footer>
        </section>
      )}
    </>
  );
});

export default Login;
