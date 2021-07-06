import React from 'react';
import styles from './info.module.css';
const info = ({ info }) => {
  const onTextClick = (e) => {
    e.preventDefault();

    const text = e.currentTarget.textContent;
    const textArea = document.createElement('textarea');
    document.body.appendChild(textArea);
    textArea.value = text;
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert("복사 되었습니다.");
  };

  return (
    <div className={styles.content}>
      <h2>{info.title}</h2>
      <a href={info.url} target="noopener">
        {info.icon}
      </a>
      <p className={styles.contentText} onClick={onTextClick}>
        {info.content}
      </p>
    </div>
  );
};

export default info;
