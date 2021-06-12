import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';
import styles from './login.module.css';
import Logo from '../logo/logo';
import Goback from '../goback/goback';

const Login = ({ authService, smpAuth, smpChat }) => {
  const history = useHistory();
  const auth = localStorage.getItem('state');
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const state = params.get('state');

  const goToStudy = useCallback(
    (id) => {
      history.push({
        pathname: '/study',
        state: { id },
      });
    },
    [history]
  );

  const onClickLoginButton = useCallback(
    (e) => {
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

            smpChat.load(data.user.uid);

            goToStudy(data.user.uid);
          })
          .catch((e) => {
            e.code === 'auth/account-exists-with-different-credential' &&
              alert(
                `같은 이메일 주소가 등록되어 있습니다. 기존의 등록한 방식으로 로그인하여 주십시오. ${e.email}`
              );

            localStorage.clear();
          });
      }
    },
    [authService, goToStudy, smpAuth, smpChat]
  );

  useEffect(() => {
    if (code && state) {
      smpAuth
        .token(code, state)
        .then((result) => {
          authService.customLogin(result.token, (user) => {
            localStorage.setItem('state', user.uid);

            window.close();
          });
        })
        .catch((e) => {
          localStorage.clear();
          window.close();
          throw Error(e);
        });
    }
  }, [smpAuth, code, state, goToStudy, authService, smpChat]);

  useEffect(() => {
    authService.loginUserCheck((user) => {
      if (user) {
        if (!auth) {
          localStorage.setItem('state', user.uid);
        }
        goToStudy(user.uid);
      } else {
        if (auth) {
          localStorage.clear();
        }

        smpChat.clear();
      }
    });
  }, [auth, authService, goToStudy, smpChat]);

  return (
    <>
      {!auth && !code && !state && (
        <section className={styles.section}>
          <header className={styles.header}>
            <Goback backBox={styles.backBox} />
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
};

export default Login;
