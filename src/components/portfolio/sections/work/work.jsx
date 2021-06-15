import React from 'react';
import styles from './work.module.css';
import Project from './project';

const work = () => {
  const projects = [
    {
      id: 1,
      title: 'SMP Oauth2.0 Server',
      url: '',
      type: 'backend',
      imgUrl: 'imgs/oauth2.0.png',
      alt: 'smp_oauth',
    },
    {
      id: 2,
      title: 'SMP Resource Server',
      url: 'https://github.com/',
      type: 'backend',
      imgUrl: 'imgs/resource_server.png',
      alt: 'resource_server',
    },
    {
      id: 3,
      title: 'SMPCHAT third-party-api',
      url: 'https://github.com/',
      type: 'frontend',
      imgUrl: 'imgs/smpchat_logo.png',
      alt: 'smpchat',
    },
    {
      id: 4,
      title: 'Portfolio Site',
      url: 'https://github.com/',
      type: 'frontend',
      imgUrl: 'imgs/smpark.jpg',
      alt: 'owner',
    },
    {
      id: 6,
      title: 'Study On Youtube Directory',
      url: 'https://github.com/',
      type: 'frontend',
      imgUrl: 'imgs/youtube_logo.png',
      alt: 'youtube',
    },
    {
      id: 7,
      title: 'Create Study Card',
      url: 'https://github.com/',
      type: 'frontend',
      imgUrl: 'imgs/study_card.png',
      alt: 'study_card',
    },
  ];

  const drawProject = (item) => <Project key={item.id} project={item} />;

  return (
    <section id="work" className={`${styles.work} section`}>
      <div className={styles.title}>
        <h1>My work</h1>
      </div>
      <p>이미지를 클릭하시면 해당하는 GitHub Page로 이동합니다.</p>
      <div className={styles.projects}>
        <h2>Back-end</h2>
        {projects.map((item) => item.type === 'backend' && drawProject(item))}
        <h2>Front-end</h2>
        {projects.map((item) => item.type === 'frontend' && drawProject(item))}
      </div>
    </section>
  );
};

export default work;
