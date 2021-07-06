import React, { memo, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Logout from '../../common/auth/logout';
import Menu from './menu';
import styles from './aside.module.css';

const Aside = memo(
  ({
    highLightMenu,
    mainRef,
    moveSection,
    portfolioRef,
    authService,
    toggleMenu,
    mobileMenuIconToggle,
  }) => {
    const menus = [
      { id: 'home', title: 'Home' },
      { id: 'about', title: 'About' },
      { id: 'skills', title: 'Skills' },
      { id: 'work', title: 'Work' },
      { id: 'contact', title: 'Contact' },
    ];
    const [observe, setObserve] = useState(null);

    const auth = localStorage.getItem('state');

    const history = useHistory();

    const onObserveTarget = useCallback((el) => {
      setObserve(el);
    }, []);

    useEffect(() => {
      highLightMenu.on(mainRef.current.childNodes, onObserveTarget);
    }, [highLightMenu, onObserveTarget, mainRef]);

    const onMenuIconClick = (e) => {
      e.preventDefault();

      if (mobileMenuIconToggle === 'on') {
        toggleMenu('off');
      } else {
        toggleMenu('on');
      }
    };

    const onPageMoveButtonClick = (e) => {
      e.preventDefault();

      if (e.currentTarget.innerText === 'Login') {
        history.push('/login');
      }

      if (e.currentTarget.innerText === 'Study') {
        history.push('/study');
      }
    };

    return (
      <>
        <button className={styles.menu__btn} onClick={onMenuIconClick}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <ul
          className={`${styles.menu} ${
            mobileMenuIconToggle === 'on' && styles.active
          }`}
        >
          <li
            className={`${styles.loginPage} ${
              mobileMenuIconToggle === 'on' && styles.active
            }`}
          >
            {auth ? (
              <Logout authService={authService} style={styles.login} />
            ) : (
              <button className={styles.login} onClick={onPageMoveButtonClick}>
                Login
              </button>
            )}
          </li>
          {observe &&
            menus.map((item) => (
              <Menu
                key={item.id}
                menu={item}
                moveSection={moveSection}
                observe={observe}
                portfolioRef={portfolioRef}
                mainRef={mainRef}
              />
            ))}
          <li
            className={`${styles.studyPage} ${
              mobileMenuIconToggle === 'on' && styles.active
            }`}
          >
            <button
              className={styles.itemButton}
              onClick={onPageMoveButtonClick}
            >
              Study
            </button>
          </li>
        </ul>
      </>
    );
  }
);

export default Aside;
