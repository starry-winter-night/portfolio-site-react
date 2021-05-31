import React, { memo, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Menu from './menu';
import styles from './aside.module.css';
import menuStyles from './menu.module.css';

const Aside = memo(
  ({ highLightMenu, portfolioRef, sectionsRef, moveSection }) => {
    const menus = [
      { id: 'home', title: 'Home' },
      { id: 'about', title: 'About' },
      { id: 'skills', title: 'Skills' },
      { id: 'work', title: 'Work' },
      { id: 'contact', title: 'Contact' },
    ];

    const [sections, setSections] = useState([]);
    const [observe, setObserve] = useState(null);
    const [menuIconToggle, setMenuIconToggle] = useState('off');

    const history = useHistory();

    useEffect(() => {
      highLightMenu.on([...sections], setObserve);
    }, [highLightMenu, sections]);

    useEffect(() => {
      const ref = sectionsRef.current;

      for (let i = 0; i < ref.childNodes.length; i++) {
        setSections((item) => [...item, ref.childNodes[i]]);
      }
    }, [sectionsRef]);

    const handleClickMenu = useCallback(
      (id) => {
        const ref = portfolioRef.current;

        moveSection.start(id, [...sections], ref);
      },
      [moveSection, portfolioRef, sections]
    );

    const changeClassName = (id, observe) => {
      if (observe) {
        if (observe === id) {
          return menuStyles.itemView;
        }

        if (observe !== id) {
          return menuStyles.item;
        }
      }
    };

    const handleMenuIconClick = (e) => {
      e.preventDefault();

      if (menuIconToggle === 'off') {
        setMenuIconToggle('on');
      } else {
        setMenuIconToggle('off');
      }
    };

    const handleStudyButtonClick = (e) => {
      e.preventDefault();

      history.push('/study');
    };

    return (
      <aside
        id="aside"
        className={`${styles.aside} ${
          menuIconToggle === 'on' && styles.active
        }`}
      >
        <button className={styles.menu__btn} onClick={handleMenuIconClick}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <ul
          className={`${styles.menu} ${
            menuIconToggle === 'on' && styles.active
          }`}
        >
          {menus.map((item) => (
            <Menu
              key={item.id}
              menu={item}
              onMenu={handleClickMenu}
              effect={changeClassName(item.id, observe)}
            />
          ))}
        </ul>
        <div
          className={`${styles.studyPage} ${
            menuIconToggle === 'on' && styles.active
          }`}
        >
          <button
            className={styles.itemButton}
            onClick={handleStudyButtonClick}
          >
            Study
          </button>
        </div>
      </aside>
    );
  }
);

export default Aside;
