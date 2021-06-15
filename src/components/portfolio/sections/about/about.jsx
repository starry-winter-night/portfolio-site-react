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
      안녕하세요. 현재 대전에 거주하는 업력 1년 차 주니어 웹 개발자입니다. 운이
      좋게도 첫 회사에서 PL로 일하며 주도적으로 개발한 경험이 있습니다. 직접
      발로 뛰며 시장 조사를 하고 고객과 미팅하며 프로젝트를 기획 및
      설계하였습니다. 또한 Front·back-end를 모두 접하며 경험할 수 있었고 다양한
      분야의 개발자분들에게 많은걸 배우고 경험하며 즐겁게 일할 수 있었습니다.
      다만 웹 개발자는 저와 동기뿐이었고 사수 또는 코드리뷰가 없는
      환경이었습니다. 업무에는 차질이 없었지만, 자신의 코드에 대한 의문과 갈증이
      항상 있었고 퇴사 후에 바로 재취업하기보단 자신의 갈증을 채우기 위해
      공부하였습니다. 현재 개발에 대한 열정이 가득 차 있습니다. 서울에 상경하여
      좋은 사람들과 멋지고 많은 경험을 하며 성장하고 싶습니다.
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
            src="imgs/company.png"
            alt="비공개"
            className={styles.job__logo}
          />
        </div>
        <ul>
          <li>
            <span>· </span> (주)oooo에서 1년 2개월 신사업부 웹 개발자로
            일하였습니다.
          </li>
          <li>
            <span>· </span> ooo, oo(가제), oooooo 및 사내 소프트웨어 등을
            개발하였습니다.
          </li>
          <li>
            <span>· </span> 그 외 업무(시장) 조사 및 미팅, K-WATER 시연,
            oo대학교 시연 및 발표 등을 맡아 하였습니다.
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default about;
