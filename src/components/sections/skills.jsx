import React from 'react';
import styles from './skills.module.css';

const Skills = (props) => (
  <section id="skills" className={`${styles.skills} section`}>
    <div className={styles.title}>
      <h1>Skills</h1>
    </div>
    <h2>Skills & Attributes</h2>
    <p>
      제가 주로 사용하거나 배워나가고 있는 스킬 셋 입니다. 수치화 기준은 저의
      주관적 자신감입니다. Java를 공부하며 프로그래머 세계에 입문하였으나 현재는
      JavaScript의 매력에 빠져 해당 분야의 전문가가 되기 위해 노력하고 있습니다.
      JavaScript라면 FrontEnd, BackEnd, FrameWork를 가리지 않고 좋아하고 해당
      분야에서 일하기를 원합니다.
    </p>
    <div className={styles.skillset}>
      <div className={styles.left}>
        <h3 className={styles.sub_title}>Skills</h3>
        <div className={styles.skill}>
          <div className={styles.description}>
            <span>HTML</span>
            <span>90%</span>
          </div>
          <div className={styles.bar}>
            <div className={styles.value}></div>
          </div>
        </div>
        <div className={styles.skill}>
          <div className={styles.description}>
            <span>CSS</span>
            <span>90%</span>
          </div>
          <div className={styles.bar}>
            <div className={styles.value}></div>
          </div>
        </div>
        <div className={styles.skill}>
          <div className={styles.description}>
            <span>JavaScript</span>
            <span>90%</span>
          </div>
          <div className={styles.bar}>
            <div className={styles.value}></div>
          </div>
        </div>
        <div className={styles.skill}>
          <div className={styles.description}>
            <span>React</span>
            <span>80%</span>
          </div>
          <div className={styles.bar}>
            <div className={styles.value}></div>
          </div>
        </div>
        <div className={styles.skill}>
          <div className={styles.description}>
            <span>TypeScript</span>
            <span>80%</span>
          </div>
          <div className={styles.bar}>
            <div className={styles.value}></div>
          </div>
        </div>
        <div className={styles.skill}>
          <div className={styles.description}>
            <span>NodeJS</span>
            <span>80%</span>
          </div>
          <div className={styles.bar}>
            <div className={styles.value}></div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.tools}>
          <h3 className={styles.sub_title}>Etc</h3>
          <ul className={styles.tools__list}>
            <li>
              <span>Visual Studio Code</span>
            </li>
            <li>
              <span>Git</span>
            </li>
            <li>
              <span>MySQL</span>
            </li>
            <li>
              <span>MongoDB</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Skills;
