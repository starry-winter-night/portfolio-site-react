import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './card.module.css';

const Card = ({ card, onEditCard, onDeleteCard }) => {
  const { id, title, subTitle, logoName, logoURL, description } = card;

  const DEFAULT_IMAGE = 'imgs/note.png';
  const url = logoURL || DEFAULT_IMAGE;

  const descriptionRef = useRef();

  const onClickEdit = () => {
    onEditCard(id);
  };

  const onClickDelete = () => {
    onDeleteCard(id);
  };

  useEffect(() => {
    descriptionRef.current.innerHTML = description || '';
  }, [description]);

  return (
    <li className={styles.card}>
      <div className={styles.bookmark}></div>
      <div className={styles.iconBox}>
        {id !== 'preview' && (
          <>
            <FontAwesomeIcon
              className={styles.edit}
              icon={faEdit}
              onClick={onClickEdit}
            />
            <FontAwesomeIcon
              className={styles.delete}
              icon={faTrashAlt}
              onClick={onClickDelete}
            />
          </>
        )}
      </div>
      <img className={styles.logo} src={url} alt={logoName} />
      <h1 className={styles.title}>{title}</h1>
      <h3 className={styles.subTitle}>{subTitle}</h3>
      <p className={styles.description} ref={descriptionRef}></p>
    </li>
  );
};
export default Card;
