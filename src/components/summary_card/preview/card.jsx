import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './card.module.css';
import Modal from '../../common/modal/modal';

const Card = ({ card, onEditButton, onDeleteButton, onLoadingEnd }) => {
  const [modalTitle, setModalTitle] = useState('');
  const [modalWord, setModalWord] = useState('');
  const [openModal, setOpenModal] = useState('');
  const [modalType, setModalType] = useState('');

  const { id, title, subTitle, logoName, logoURL, description } = card;

  const DEFAULT_IMAGE = 'imgs/note.png';
  const url = logoURL || DEFAULT_IMAGE;

  const cardRef = useRef();
  const descriptionRef = useRef();
  const logoRef = useRef();

  const onClickEdit = () => {
    onEditButton(id);
  };

  const onClickDelete = () => {
    setModalTitle(title);
    setOpenModal('open');
    setModalWord(
      '해당 카드는 삭제되며 복구되지 않습니다. \n 정말 삭제 하시겠습니까?'
    );
    setModalType('delete');
  };

  const onCheckModal = (type) => {
    if (type === 'delete') {
      onDeleteButton(id);
    }
  };

  const onCloseModal = () => {
    setOpenModal('close');
  };

  // console.log(card);

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.innerHTML = description || '';
    }
  }, [description]);

  // useEffect(() => {
  //   if (logoRef.current) {
  //     onLoadingEnd();
  //     logoRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [logoURL]);

  useEffect(() => {
    if (logoURL === logoRef.current.src) {
      logoRef.current.addEventListener('load', onLoadingEnd);
    }
  }, [onLoadingEnd]);

  useEffect(() => {
    cardRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [card]);

  return (
    <>
      <li className={styles.card} ref={cardRef}>
        {/* {(loading.type === 'Add' && loading.state && id === 'preview' && (
          <Loading styles={styles} />
        )) ||
          (loading.type === 'Edit' && loading.state && id === loading.key && (
            <Loading styles={styles} />
          ))} */}
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
        <img className={styles.logo} src={url} alt={logoName} ref={logoRef} />
        <h1 className={styles.title}>{title}</h1>
        <h3 className={styles.subTitle}>{subTitle}</h3>
        <p className={styles.description} ref={descriptionRef}></p>
      </li>
      <Modal
        onOpenModal={openModal}
        onCheckModal={onCheckModal}
        onCloseModal={onCloseModal}
        modalType={modalType}
        modalWord={modalWord}
        modalTitle={modalTitle}
      />
    </>
  );
};
export default Card;
