import React, { useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './modal.module.css';
import Button from '../button/button';

const Modal = ({
  modalWord,
  modalTitle,
  modalType,
  onOpenModal,
  onCloseModal,
  onCheckModal,
}) => {
  const modalRef = useRef();

  const onClick = useCallback(
    (e) => {
      const value = e.currentTarget.innerText;

      if (e.target === modalRef.current) {
        onCloseModal();
      }

      if (value === '확인') {
        onCheckModal(modalType);
      }
    },
    [modalType, onCheckModal, onCloseModal]
  );

  return (
    <>
      {onOpenModal === 'open' && (
        <article ref={modalRef} className={styles.article} onClick={onClick}>
          <div className={styles.container}>
            <FontAwesomeIcon
              icon={faTimes}
              className={styles.closeButton}
              onClick={onCloseModal}
            />
            <h3 className={styles.title}>{modalTitle}</h3>
            <h3 className={styles.word}>{modalWord}</h3>
            <Button
              value="확인"
              onClick={onClick}
              buttonStyle={styles.leftButton}
            ></Button>
            <Button
              value="취소"
              onClick={onCloseModal}
              buttonStyle={styles.rightButton}
            ></Button>
          </div>
        </article>
      )}
    </>
  );
};

export default Modal;
