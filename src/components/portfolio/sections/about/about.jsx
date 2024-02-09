import React from 'react';
import styles from './about.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faSmokingBan } from '@fortawesome/free-solid-svg-icons';
import { faJsSquare } from '@fortawesome/free-brands-svg-icons';

const about = () => (
  <section id='about' className={`${styles.about} section`}>
    <div className={styles.title}>
      <h1>About me</h1>
    </div>
    <pre>
      {`3년 차 개발자로 스타트업에서 웹 서비스를 기획/개발/배포/운영하였습니다. 작은 규모의 팀에 입사하였고
      팀의 유일한 개발자로서 사내 수익을 가장 많이 일으키는 팀이 되기까지 개발 업무를 책임졌습니다. 

      클라이언트와 운영팀의 반복되는 일을 자동화하기 위해 기존의 프로세스를 개선하는 백오피스를 개발하였으며 
      현재까지 회사의 호평 속에 운영되고 수익을 내고 있습니다. 

      조용하고 묵묵하게 개발하되, 업무 파악 및 협조, 다른 동료의 의견 수렴에 적극적인 스타일이며 
      스스로의 부족함을 알고 인정하며 개선하는 것을 두려워하지 않습니다.`}
    </pre>

    <div className={styles.majors}>
      <div className={styles.major}>
        <div className={styles.major__icon}>
          <FontAwesomeIcon icon={faJsSquare} />
        </div>
        <h2 className={styles.major__title}>Front-end</h2>
      </div>
      <div className={styles.major}>
        <div className={styles.major__icon}>
          <FontAwesomeIcon icon={faServer} />
        </div>
        <h2 className={styles.major__title}>Back-end</h2>
      </div>
      <div className={styles.major}>
        <div className={styles.major__icon}>
          <pre>{`MB
          TI`}</pre>
        </div>
        <h2 className={styles.major__title}>I-S-F-J</h2>
      </div>
      <div className={styles.major}>
        <div className={styles.major__icon}>
          <FontAwesomeIcon icon={faSmokingBan} />
        </div>
        <h2 className={styles.major__title}>No-Smoking</h2>
      </div>
    </div>
  </section>
);

export default about;
