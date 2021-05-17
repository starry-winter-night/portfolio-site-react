import React from 'react';
import { useLocation, useHistory } from 'react-router';
import { useEffect } from 'react/cjs/react.development';
import Goback from '../common/goback/goback';
import styles from './error.module.css';
const Error = ({ FontAwesome, authService }) => {
  const location = useLocation();

  const code = location.state?.code;

  let description = null;

  if (code === 403) {
    description = `죄송합니다. 유튜브에 컨텐츠를 요청할 수 있는 1일 할당 포인트가 초과 되었습니다. 
할당량은 오후 4시에 재할당 됩니다.`;
  } else {
    description = `죄송합니다. 서버에 문제가 발생했습니다. 오류가 계속되면 관리자에게 채팅 메시지 또는 이메일을 보내주세요. smpark7723@gmail.com`;
  }

  const history = useHistory();

  useEffect(() => {
    !code && history.push('/');
  }, [code, history]);

  const hadleLogout = () => {
    authService.logout();
    history.push('/');
  };
  return (
    <>
      {code && (
        <div className={styles.container}>
          <header className={styles.header}>
            <Goback FontAwesome={FontAwesome} backBox={styles.backBox} />
            <div>
              <button className={styles.logout} onClick={hadleLogout}>
                logout
              </button>
            </div>
          </header>
          <section className={styles.section}>
            <h3 className={styles.error}>ERROR</h3>
            <img
              className={styles.alert}
              src="/imgs/alert.png"
              alt="alert"
            ></img>
            <h3 className={styles.code}>{code}</h3>
            <p className={styles.description}>{description}</p>
          </section>
          <footer className={styles.footer}>
            <ul>
              <li>2021 software engineer smpark - All rights reserved</li>
            </ul>
          </footer>
        </div>
      )}
    </>
  );
};

export default Error;
