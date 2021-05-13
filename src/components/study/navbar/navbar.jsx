import React, { useRef, memo } from 'react';
import { useHistory } from 'react-router';
import styles from './navbar.module.css';
import Menu from './menu';
import Goback from '../../common/goback/goback';
import { faSearch, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const Navbar = memo(
  ({
    FontAwesome,
    menus,
    onMenu,
    onSearch,
    onDropbox,
    etcToggle,
    authService,
  }) => {
    const inputRef = useRef();
    const history = useHistory();

    const handleSubmitSearch = (e) => {
      e.preventDefault();

      const query = inputRef.current.value;

      query && onSearch(query, 'Search');

      inputRef.current.value = '';
    };

    const hadleToggle = () => {
      onDropbox();
    };

    const hadleLogout = () => {
      authService.logout();
      history.push('/');
    };

    return (
      <nav className={styles.navbar}>
        <Goback FontAwesome={FontAwesome} backBox={styles.backBox} />
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
