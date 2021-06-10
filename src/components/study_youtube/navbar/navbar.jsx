import React from 'react';
import styles from './navbar.module.css';
import Menu from './menu';
import Goback from '../../common/goback/goback';
import Search from '../../common/search/search';
import Dropbox from '../../common/button/dropbox';

const Navbar = ({ layer, onMenuClick, onSearch, etcToggleId, authService }) => {
  const onClickLogout = (text) => {
    if (text === 'logout') {
      localStorage.clear();
      authService.logout();
    }
  };
  const list = ['logout'];

  return (
    <nav className={styles.navbar}>
      <Goback backBox={styles.backBox} />
      <Search onSearch={onSearch} logoName="youtubeLogo.png" />
      <ul className={styles.studyList}>
        {layer.map((item) => (
          <Menu key={item.id} onMenuClick={onMenuClick} item={item} />
        ))}
        <li>
          <Dropbox
            etcToggleId={etcToggleId}
            list={list}
            listClick={onClickLogout}
            styles={styles}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
