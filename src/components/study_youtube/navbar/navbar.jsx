import React, { memo } from 'react';
import styles from './navbar.module.css';
import Menu from './menu';
import Goback from '../../common/goback/goback';
import Search from '../../common/search/search';
import Dropbox from '../../common/button/dropbox';

const Navbar = memo(
  ({ layer, onMenuClick, onSearch, etcToggleId, authService }) => {
    const onNavMenuListClick = (text) => {
      if (text === '로그아웃') {
        localStorage.clear();
        authService.logout();
      } else {
        onMenuClick(text);
      }
    };
    const list = ['로그아웃'];
    const mobileList = ['Search', 'My List', "Smpark's Picks", '로그아웃'];

    return (
      <nav className={styles.navbar}>
        <Goback backBox={styles.backBox} />
        <Search onSearch={onSearch} logoName="youtubeLogo.png" />
        <ul className={styles.studyList}>
          {layer.map((item) => (
            <Menu
              key={item.id}
              onMenuClick={onMenuClick}
              view={item.view}
              title={item.title}
            />
          ))}
          <li className={styles.etcDropbox}>
            <Dropbox
              etcToggleId={etcToggleId}
              list={list}
              listClick={onNavMenuListClick}
              styles={styles}
            />
          </li>
          <li className={styles.etcMobileDropbox}>
            <Dropbox
              etcToggleId={etcToggleId}
              list={mobileList}
              listClick={onNavMenuListClick}
              styles={styles}
            />
          </li>
        </ul>
      </nav>
    );
  }
);

export default Navbar;
