import React, { useEffect, useRef } from 'react';
import styles from './card.module.css';
const Card = ({ card }) => {
  const { title, subTitle, logoURL, description } = card;

  const DEFAULT_IMAGE = 'imgs/note.png';
  const url = logoURL || DEFAULT_IMAGE;

  const descriptionRef = useRef();

  useEffect(() => {
    descriptionRef.current.innerHTML = description;
  }, [description]);

  return (
    <li className={styles.card}>
      <div className={styles.bookmark}></div>
      <img className={styles.logo} src={url} alt="card Logo" />
      <h1 className={styles.title}>{title}</h1>
      <h3 className={styles.subTitle}>{subTitle}</h3>
      <p className={styles.description} ref={descriptionRef}></p>
    </li>
  );
};
export default Card;
