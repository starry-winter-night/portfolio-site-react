import React from 'react';
import styles from './navbar.module.css';
import Menu from './menu';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ FontAwesome, menus, onMenu }) => {
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
        {menus.map((item) => (
          <Menu key={item.id} title={item.title} onMenu={onMenu} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
