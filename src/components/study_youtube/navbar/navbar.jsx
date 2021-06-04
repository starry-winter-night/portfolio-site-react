import React from 'react';
import styles from './navbar.module.css';
import Menu from './menu';
import Goback from '../../common/goback/goback';
import Search from '../../common/search/search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({
  layer,
  onMenuClick,
  onSearch,
  onDropBoxClick,
  etcToggle,
  authService,
}) => {
  const onClickToggle = () => {
    onDropBoxClick();
  };

  const onClickLogout = () => {
    localStorage.clear();
    authService.logout();
  };

  return (
    <nav className={styles.navbar}>
      <Goback backBox={styles.backBox} />
      <Search onSearch={onSearch} logoName="youtubeLogo.png" />
      <ul className={styles.studyList}>
        {layer.map((item) => (
          <Menu key={item.id} onMenuClick={onMenuClick} item={item} />
        ))}
        <li className={styles.etc} onClick={onClickToggle} data-id="etc">
          <FontAwesomeIcon icon={faEllipsisV} />
          {etcToggle === 'on' && (
            <div className={styles.dropbox}>
              <ul className={styles.list}>
                <li onClick={onClickLogout}>logout</li>
              </ul>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
