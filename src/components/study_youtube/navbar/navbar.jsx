import React from 'react';
import styles from './navbar.module.css';
import Menu from './menu';
import Goback from '../../common/goback/goback';
import Search from '../../common/search/search';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';

const Navbar = ({
  FontAwesome,
  layer,
  onMenu,
  onSearch,
  onDropbox,
  etcToggle,
  onLogout,
}) => {
  const history = useHistory();

  const hadleToggle = () => {
    onDropbox();
  };

  const hadleLogout = () => {
    onLogout();

    history.push('/login');
  };

  return (
    <nav className={styles.navbar}>
      <Goback FontAwesome={FontAwesome} backBox={styles.backBox} />
      <Search
        FontAwesome={FontAwesome}
        onSearch={onSearch}
        logoName="youtubeLogo.png"
      />
      <ul className={styles.studyList}>
        {layer.map((item) => (
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
};

export default Navbar;
