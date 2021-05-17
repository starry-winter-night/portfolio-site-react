import React from 'react';
import styles from './work.module.css';
import Project from './project';

const work = ({ sectionRefs }) => {
  const projects = [
    {
      id: 1,
      title: 'Oauth2.0 Server',
      url: 'https://smpark.dev',
      type: 'backend',
      imgUrl: 'imgs/oauth2.0.png',
      alt: 'oauthImage',
    },
    {
      id: 2,
      title: 'Resource Server',
      url: 'https://smpark.dev',
      type: 'backend',
      imgUrl: 'imgs/oauth2.0.png',
      alt: 'oauthImage',
    },
    {
      id: 3,
      title: 'SMPCHAT third-party-api',
      url: 'https://smpark.dev',
      type: 'frontend',
      imgUrl: 'imgs/message.png',
      alt: 'messageImage',
    },
    {
      id: 4,
      title: 'Portfolio Site',
      url: 'https://smpark.dev',
      type: 'frontend',
      imgUrl: 'imgs/smpark.jpg',
      alt: 'ownerImage',
    },
    {
      id: 6,
      title: 'Web Study Directory',
      url: 'https://smpark.dev',
      type: 'frontend',
      imgUrl: 'imgs/smpark.jpg',
      alt: 'ownerImage',
    },
    {
      id: 7,
      title: 'Create Study Card',
      url: 'https://smpark.dev',
      type: 'frontend',
      imgUrl: 'imgs/smpark.jpg',
      alt: 'ownerImage',
    },
  ];

  const drawProject = (item) => <Project key={item.id} project={item} />;

  return (
    <section id="work" className={`${styles.work} section`} ref={sectionRefs}>
      <div className={styles.title}>
        <h1>My work</h1>
      </div>
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
