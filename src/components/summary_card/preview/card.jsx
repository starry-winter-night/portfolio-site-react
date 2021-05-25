import React from 'react';
import styles from './card.module.css';
const Card = ({ card }) => {
  const { title, subTitle, logoURL, description } = card;

  const DEFAULT_IMAGE = 'imgs/default_logo.png';
  const url = logoURL || DEFAULT_IMAGE;

  return (
    <li className={styles.card}>
      <div className={styles.bookmark}></div>
      <img className={styles.logo} src={url} alt="card Logo" />
      <h1 className={styles.title}>{title}</h1>
      <h3 className={styles.subTitle}>{subTitle}</h3>
      <p className={styles.description}>{description}</p>
    </li>
  );
};
export default Card;
