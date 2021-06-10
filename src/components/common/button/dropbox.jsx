import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const Dropbox = ({
  etcToggleId,
  dropboxId = 'id',
  listClick,
  styles,
  list,
}) => {
  const onButtonClick = (e) => {
    listClick(e.target.textContent);
  };

  return (
    <div className={styles.dropbox_container}>
      <FontAwesomeIcon
        icon={faEllipsisV}
        id={styles.dropbox_icon}
        data-etc-id={dropboxId}
      />
      {etcToggleId === dropboxId && (
        <ul className={styles.dropbox_list}>
          {list.map((item) => (
            <li key={item} onClick={onButtonClick}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropbox;
