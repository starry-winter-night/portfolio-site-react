import React from 'react';
import styles from './skills.module.css';
// import Skill from './skill';
// import Etc from './etc';
// import ToggleArrow from '../../../common/button/toggleArrow';

const Skills = () => {
  // const skills = [
  //   { id: 1, title: 'HTML & Pug(Jade)', bar: '85%' },
  //   { id: 2, title: 'CSS & PostCSS', bar: '85%' },
  //   { id: 3, title: 'JavaScript(ES 6-11)', bar: '85%' },
  //   { id: 5, title: 'NodeJS(Express & Koa)', bar: '85%' },
  //   { id: 4, title: 'React(Hook)', bar: '75%' },
  //   { id: 6, title: 'TypeScript', bar: 'installing...' },
  // ];

  // const etcs = [
  //   { id: 1, title: 'Visual Studio Code' },
  //   { id: 2, title: 'Git' },
  //   { id: 3, title: 'MySQL' },
  //   { id: 4, title: 'MongoDB(Mongoose)' },
  //   { id: 5, title: 'FireBase' },
  //   { id: 6, title: 'Cloudinary' },
  // ];

  return (
    <section id='skills' className={`${styles.skills} section`}>
      <div className={styles.title}>
        <h1>Skills</h1>
      </div>
      <h2>Skills & Attributes</h2>
      {/* <ToggleArrow title={'2021'}>
        <p className={styles.sills_about}>
          제가 주로 사용하거나 배워나가고 있는 스킬 셋입니다. 수치화 기준은 주관적 적응 및 숙련도입니다. Java를 공부하며
          프로그래머 세계에 입문하였으나 현재는 JavaScript의 매력에 빠져 해당 분야의 전문가가 되기 위해 노력하고
          있습니다. JavaScript라면 FrontEnd, BackEnd, FrameWork를 가리지 않고 좋아하고 해당 분야에서 일하기를
          희망합니다.
        </p>
        <div className={styles.skillset}>
          <ul className={styles.left}>
            <h3 className={styles.sub_title}>Skills</h3>
            {skills.map((item) => (
              <Skill key={item.id} skillList={item} />
            ))}
          </ul>
          <ul className={styles.right}>
            <div className={styles.tools}>
              <h3 className={styles.sub_title}>Etc</h3>
              <ul className={styles.tools__list}>
                {etcs.map((item) => (
                  <Etc key={item.id} etc={item} />
                ))}
              </ul>
            </div>
          </ul>
        </div>
      </ToggleArrow> */}
      <h3 className={styles.skills_about}>Overall</h3>
      <li className={styles.skills_li}>기존의 개발 설계, 방법, 규칙등에 맞춰 개발합니다.</li>
      <li className={styles.skills_li}>항상 최신기술을 사용하기보다 더 적절하다고 생각되는 기술을 선택합니다.</li>
      <li className={styles.skills_li}>회사 업무 중 개발만이 나의 업무라고 생각하지 않습니다.</li>
      <h3 className={styles.skills_about}>Web</h3>
      <li className={styles.skills_li}>반응형 웹 제작 경험이 많습니다.</li>
      <li className={styles.skills_li}>모바일 브라우저에서의 트러블 슈팅 경험이 있습니다.</li>
      <h3 className={styles.skills_about}>JavaScript</h3>
      <li className={styles.skills_li}>JavaScript와 TypeScript에 능숙합니다.</li>
      <li className={styles.skills_li}>모듈 시스템(CommonJS, ES Modules)에 대해서 이해하고 사용합니다.</li>
      <li className={styles.skills_li}>NodeJS 개발 경험이 있습니다.</li>
      <h3 className={styles.skills_about}>React</h3>
      <li className={styles.skills_li}>React hooks를 사용하고 공통 비즈니스 로직을 모듈화하여 사용합니다.</li>
      <li className={styles.skills_li}>Testing Library를 사용하여 테스트코드를 작성할 수 있습니다.</li>
      <li className={styles.skills_li}>PureComponent, memo, lazy 등 성능 개선 경험이 있습니다.</li>
    </section>
  );
};

export default Skills;
