import React from 'react';
import styles from './about.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer } from '@fortawesome/free-solid-svg-icons';
import { faJsSquare } from '@fortawesome/free-brands-svg-icons';

const about = () => (
  <section id="about" className={`${styles.about} section`}>
    <div className={styles.title}>
      <h1>About me</h1>
    </div>
    <p>
      안녕하세요. 상경을 꿈꾸는 웹 개발자입니다. 전 운이 좋게도 첫 회사에서 제가
      만든 기획서가 통과되어 PL로써 주도적으로 개발하며 경험을 쌓았습니다. 직접
      발로 뛰며 시장 조사를 하고 고객과 미팅하며 프로젝트의 기획, 설계 및 배포
      등 전반적인 업무를 경험하였습니다. Front-end, Back-end를 모두 맡아 개발 할
      수 있었고 다양한 분야의 개발자분들에게 많은 걸 배우고 경험하며 즐겁게 일할
      수 있었습니다. 다만 웹 개발자는 저와 동기뿐이었고 업무에는 차질이
      없었지만, 사수와 코드리뷰가 없는 환경이었기에 코드에 대한 의문과 갈증이
      있었습니다. 결국, 퇴사 후에는 바로 재취업보다 갈증을 채우는 것을
      선택하였습니다. 개발에 대한 열정이 가득 차 있습니다. 상경하여 좋은 분들과
      멋지고 많은 경험을 하며 함께 성장하고 싶습니다.
    </p>
    <div className={styles.majors}>
      <div className={styles.major}>
        <div className={styles.major__icon}>
          <FontAwesomeIcon icon={faJsSquare} />
        </div>
        <h2 className={styles.major__title}>Front-end</h2>
        <div className={styles.major__description}>
          HTML, CSS, JavaScript, TypeScript, <br />
          React, Web APIs
        </div>
      </div>
      <div className={styles.major}>
        <div className={styles.major__icon}>
          <FontAwesomeIcon icon={faServer} />
        </div>
        <h2 className={styles.major__title}>Back-end</h2>
        <div className={styles.major__description}>
          NodeJS(express, koa), MySQL, <br />
          MongoDB <br />
        </div>
      </div>
    </div>
    <div className={styles.jobs}>
      <div className={styles.job}>
        <div className={styles.jobImg}>
          <img
            src="imgs/irexnet.png"
            alt="irexnet"
            className={styles.job__logo}
          />
        </div>
        <ul>
          <li>
            <span>· </span> (주)irexnet에서 1년 2개월 신사업기획개발부 웹
            개발자로 일하였습니다.
          </li>
          <li>
            <span>· </span> PLM, 점빵(가제), 네이버 클로버(음성쇼핑) 및 사내
            소프트웨어 등을 개발하였습니다.
          </li>
          <li>
            <span>· </span> 그 외 업무 관련 시장조사 및 클라이언트 미팅, K-WATER
            시연, 대전대학교 시연 및 발표 등을 팀에서 맡아 하였습니다.
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default about;
