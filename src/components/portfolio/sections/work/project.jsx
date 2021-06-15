import React from 'react';
import styles from './propject.module.css';

const project = ({ project }) => {
  return (
    <a
      href={project.url}
      className={`${styles.project} ${project.type}`}
      target="noopener"
    >
      <img
        src={project.imgUrl}
        alt={project.alt}
        className={styles.project__img}
      />
      <div className={styles.projcet__description}>
        <h3>{project.title}</h3>
      </div>
    </a>
  );
};

export default project;
