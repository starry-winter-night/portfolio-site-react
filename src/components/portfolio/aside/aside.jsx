import React, { memo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './aside.module.css';
import menuStyles from './menu.module.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Menu from './menu';
const Aside = memo(({ observe, onMenu, FontAwesome, firebase }) => {
  const [menuIconToggle, setMenuIconToggle] = useState('off');
  const history = useHistory();

  const menus = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'skills', title: 'Skills' },
    { id: 'work', title: 'Work' },
    { id: 'contact', title: 'Contact' },
  ];

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
    firebase.loginUserCheck((user) => {
      !user ? history.push('/login') : history.push('/study');
    });
  };

  return (
    <aside
      id="aside"
      className={`${styles.aside} ${menuIconToggle === 'on' && styles.active}`}
    >
      <button className={styles.menu__btn} onClick={handleMenuIconClick}>
        <FontAwesome icon={faBars} />
      </button>
      <ul
        className={`${styles.menu} ${menuIconToggle === 'on' && styles.active}`}
      >
        {menus.map((item) => (
          <Menu
            key={item.id}
            menu={item}
            onMenu={onMenu}
            effect={changeClassName(item.id, observe)}
          />
        ))}
      </ul>
      <div
        className={`${styles.studyPage} ${
          menuIconToggle === 'on' && styles.active
        }`}
      >
        <button className={styles.itemButton} onClick={handleStudyButtonClick}>
          Study
        </button>
        {/* <img
          src="imgs/message.png"
          alt="chatting"
          className={styles.smpchat_icon}
        /> */}
      </div>
    </aside>
  );
});

export default Aside;
