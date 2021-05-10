import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './navbar.module.css';
import Menu from './menu';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ FontAwesome, menus, onMenu, onSearch }) => {
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
          <Menu key={item.id} title={item.title} onMenu={onMenu} item={item} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
