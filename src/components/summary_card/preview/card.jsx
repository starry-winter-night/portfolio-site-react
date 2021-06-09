import React, { memo, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faEdit,
  faPlus,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import Modal from '../../common/modal/modal';

const Card = memo(
  ({
    card,
    styles,
    onEditButton,
    onDeleteButton,
    onAddButton,
    selectedCard = '',
  }) => {
    const [modalTitle, setModalTitle] = useState('');
    const [modalWord, setModalWord] = useState('');
    const [openModal, setOpenModal] = useState('');
    const [modalType, setModalType] = useState('');

    const { id, title, subTitle, logoName, logoURL, description } = card;

    // console.log(card)

    // const DEFAULT_IMAGE = 'imgs/note.png';
    const DEFAULT_IMAGE = '';
    const url = logoURL || DEFAULT_IMAGE;

    const cardRef = useRef();
    const descriptionRef = useRef();
    const logoRef = useRef();

    const onClickEdit = () => {
      onEditButton(id);
    };

    const onClickAdd = (e) => {
      e.preventDefault();

      onAddButton(selectedCard.id, card);
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
        onDeleteButton(card);
      }
    };

    const onCloseModal = () => {
      setOpenModal('close');
    };

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

    // useEffect(() => {
    //   cardRef.current.scrollIntoView({ behavior: 'smooth' });
    // }, [card]);

    return (
      <ul>
        <li className={styles.card} ref={cardRef}>
          <div className={styles.card_bookmark}></div>
          <div className={styles.card_iconBox}>
            {selectedCard && id !== selectedCard.id && (
              <FontAwesomeIcon
                className={styles.card_edit}
                icon={faEdit}
                onClick={onClickEdit}
              />
            )}

            {selectedCard && id === selectedCard.id && (
              <FontAwesomeIcon //
                className={styles.card_check}
                icon={faCheck}
              />
            )}

            {selectedCard && id !== 'preview' && (
              <FontAwesomeIcon
                className={styles.card_delete}
                icon={faTrashAlt}
                onClick={onClickDelete}
              />
            )}
            {selectedCard && id === 'preview' && (
              <FontAwesomeIcon
                className={styles.card_add}
                icon={faPlus}
                onClick={onClickAdd}
              />
            )}
          </div>
          <img
            className={styles.card_logo}
            src={url}
            alt={logoName}
            ref={logoRef}
          />
          <h1 className={styles.card_title}>{title}</h1>
          <h3 className={styles.card_subTitle}>{subTitle}</h3>
          <p className={styles.card_description} ref={descriptionRef}></p>
        </li>
        <Modal
          onOpenModal={openModal}
          onCheckModal={onCheckModal}
          onCloseModal={onCloseModal}
          modalType={modalType}
          modalWord={modalWord}
          modalTitle={modalTitle}
        />
      </ul>
    );
  }
);
export default Card;
