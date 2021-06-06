import React, { memo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Menu from './menu';
import styles from './aside.module.css';

const Aside = memo(({ highLightMenu, onMenuClick, sections }) => {
  const menus = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'skills', title: 'Skills' },
    { id: 'work', title: 'Work' },
    { id: 'contact', title: 'Contact' },
  ];

  const [observe, setObserve] = useState(null);
  const [mobileMenuIconToggle, setMobileMenuIconToggle] = useState('off');

  const history = useHistory();

  useEffect(() => {
    highLightMenu.on([...sections], setObserve);
  }, [highLightMenu, sections]);

  const onMenuIconClick = (e) => {
    e.preventDefault();

    if (mobileMenuIconToggle === 'off') {
      setMobileMenuIconToggle('on');
    } else {
      setMobileMenuIconToggle('off');
    }
  };

  const onStudyButtonClick = (e) => {
    e.preventDefault();

    history.push('/study');
  };

  return (
    <aside
      id="aside"
      className={`${styles.aside} ${
        mobileMenuIconToggle === 'on' && styles.active
      }`}
    >
      <button className={styles.menu__btn} onClick={onMenuIconClick}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul
        className={`${styles.menu} ${
          mobileMenuIconToggle === 'on' && styles.active
        }`}
      >
        {menus.map((item) => (
          <Menu
            key={item.id}
            menu={item}
            onMenuClick={onMenuClick}
            observe={observe}
          />
        ))}
        <li
          className={`${styles.studyPage} ${
            mobileMenuIconToggle === 'on' && styles.active
          }`}
        >
          <button
            className={styles.itemButton}
            onClick={onStudyButtonClick}
          >
            Study
          </button>
        </li>
      </ul>
    </aside>
  );
});

export default Aside;
