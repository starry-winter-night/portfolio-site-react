import React, { memo, useState } from 'react';
import styles from './aside.module.css';
import menuStyles from './menu.module.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Menu from './menu';

const Aside = memo(({ observe, handleClickMenu, FontAwesome }) => {
  const [toggle, setToggle] = useState('off');

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

  const handleMenuClick = (e) => {
    e.preventDefault();

    if (toggle === 'off') {
      setToggle('on');
    } else {
      setToggle('off');
    }
  };

  const onMenuClick = (e) => handleClickMenu(e.target.dataset.id);

  return (
    <aside
      id="aside"
      className={`${styles.aside} ${toggle === 'on' && styles.active}`}
    >
      <button className={styles.menu__btn} onClick={handleMenuClick}>
        <FontAwesome icon={faBars} />
      </button>
      <ul className={`${styles.menu} ${toggle === 'on' && styles.active}`}>
        {menus.map((item) => (
          <Menu
            key={item.id}
            menu={item}
            handleClickMenu={handleClickMenu}
            effect={changeClassName(item.id, observe)}
            onMenuClick={onMenuClick}
          />
        ))}
      </ul>
      <div
        className={`${styles.studyPage} ${toggle === 'on' && styles.active}`}
      >
        <button className={styles.itemButton}>Study</button>
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
