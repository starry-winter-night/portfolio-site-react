import React, { useRef, memo } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './navbar.module.css';
import Menu from './menu';
import {
  faArrowLeft,
  faSearch,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = memo(
  ({
    FontAwesome,
    menus,
    onMenu,
    onSearch,
    onDropbox,
    etcToggle,
    firebase,
  }) => {
    const inputRef = useRef();
    const homeHistory = useHistory();

    const handleSubmitSearch = (e) => {
      e.preventDefault();

      const query = inputRef.current.value;

      query && onSearch(query, 'Search');

      inputRef.current.value = '';
    };

    const handleGoBack = () => {
      homeHistory.push('/');
    };

    const hadleToggle = () => {
      onDropbox();
    };

    const hadleLogout = () => {
      firebase.logout();
    };

    return (
      <nav className={styles.navbar}>
        <div className={styles.backBox}>
          <FontAwesome
            className={styles.backIcon}
            icon={faArrowLeft}
            onClick={handleGoBack}
          />
        </div>
        <form className={styles.inputBox} onSubmit={handleSubmitSearch}>
          <img
            src="/imgs/youtubeLogo.png"
            alt="youtubeLogo"
            className={styles.logo}
          ></img>
          <input
            className={styles.searchInput}
            ref={inputRef}
            placeholder="검색"
          ></input>
          <button className={styles.searchButton}>
            <FontAwesome className={styles.searchIcon} icon={faSearch} />
          </button>
        </form>
        <ul className={styles.studyList}>
          {menus.map((item) => (
            <Menu key={item.id} onMenu={onMenu} item={item} />
          ))}
          <li className={styles.etc} onClick={hadleToggle} data-id="etc">
            <FontAwesome icon={faEllipsisV} />
            {etcToggle === 'on' && (
              <div className={styles.dropbox}>
                <ul className={styles.list}>
                  <li onClick={hadleLogout}>logout</li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </nav>
    );
  }
);

export default Navbar;
