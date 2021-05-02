import React, { memo } from 'react';
import styles from './aside.module.css';
import menuStyles from './menu.module.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Menu from './menu';

const Aside = memo(({ observe, moveSection, FontAwesome }) => {
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

  const onMenuClick = (e) => moveSection(e.target.dataset.id);

  return (
    <aside id="aside" className={styles.aside}>
      <button className={styles.menu__btn}>
        <FontAwesome icon={faBars} />
      </button>
      <ul className={styles.menu}>
        {menus.map((item) => (
          <Menu
            key={item.id}
            menu={item}
            moveSection={moveSection}
            effect={changeClassName(item.id, observe)}
            onMenuClick={onMenuClick}
          />
        ))}
      </ul>
      <div className={styles.smpchat}>
        <img
          src="imgs/message.png"
          alt="chatting"
          className={styles.smpchat_icon}
        />
      </div>
    </aside>
  );
});

export default Aside;
