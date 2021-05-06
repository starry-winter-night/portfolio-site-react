import React from 'react';
import styles from './navbar.module.css';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ FontAwesome }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.backBox}>
        <FontAwesome className={styles.backIcon} icon={faArrowLeft} />
      </div>
      <form className={styles.inputBox}>
        <img
          src="/imgs/youtubeLogo.png"
          alt="youtubeLogo"
          className={styles.logo}
        ></img>
        <input className={styles.searchInput} placeholder="검색"></input>
        <button className={styles.searchButton}>
          <FontAwesome className={styles.searchIcon} icon={faSearch} />
        </button>
      </form>
      <ul className={styles.studyList}>
        <li className={styles.music}>Search</li>
        <li className={styles.frontEnd}>Develop</li>
        <li className={styles.etc}>Etc</li>
        <li className={styles.backEnd}>Card</li>
      </ul>
    </nav>
  );
};

export default Navbar;
