import React, { memo, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Menu from './menu';
import styles from './aside.module.css';

const Aside = memo(({ highLightMenu, sections, moveSection, container }) => {
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

  const onObserveTarget = useCallback((el) => {
    setObserve(el);
  }, []);

  useEffect(() => {
    highLightMenu.on(sections, onObserveTarget);
  }, [highLightMenu, onObserveTarget, sections]);

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
        {observe &&
          menus.map((item) => (
            <Menu
              key={item.id}
              menu={item}
              moveSection={moveSection}
              observe={observe}
              container={container}
              sections={sections}
            />
          ))}
        <li
          className={`${styles.studyPage} ${
            mobileMenuIconToggle === 'on' && styles.active
          }`}
        >
          <button className={styles.itemButton} onClick={onStudyButtonClick}>
            Study
          </button>
        </li>
      </ul>
    </aside>
  );
});

export default Aside;
