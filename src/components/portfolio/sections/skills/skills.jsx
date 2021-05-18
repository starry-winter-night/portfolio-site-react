import React from 'react';
import styles from './skills.module.css';
import Skill from './skill';
import Etc from './etc';
const Skills = () => {
  const skills = [
    { id: 1, title: 'HTML', bar: '85%' },
    { id: 2, title: 'CSS', bar: '85%' },
    { id: 3, title: 'JavaScript', bar: '85%' },
    { id: 4, title: 'React', bar: '75%' },
    { id: 5, title: 'TypeScript', bar: '75%' },
    { id: 6, title: 'NodeJS', bar: '80%' },
  ];

  const etcs = [
    { id: 1, title: 'Visual Studio Code' },
    { id: 2, title: 'Git' },
    { id: 3, title: 'MySQL' },
    { id: 4, title: 'MongoDB' },
    { id: 5, title: 'FireBase' },
    { id: 6, title: 'Cloudinary' },
  ];

  return (
    <section id="skills" className={`${styles.skills} section`}>
      <div className={styles.title}>
        <h1>Skills</h1>
      </div>
      <h2>Skills & Attributes</h2>
      <p>
        제가 주로 사용하거나 배워나가고 있는 스킬 셋 입니다. 수치화 기준은 적응
        및 숙련도 입니다. Java를 공부하며 프로그래머 세계에 입문하였으나 현재는
        JavaScript의 매력에 빠져 해당 분야의 전문가가 되기 위해 노력하고
        있습니다. JavaScript라면 FrontEnd, BackEnd, FrameWork를 가리지 않고
        좋아하고 해당 분야에서 일하기를 원합니다.
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
    </section>
  );
};

export default Skills;
