import React, { memo } from 'react';

const Menu = memo(({ menu, effect, onMenuClick }) => {

  return (
    <li className={effect} data-id={menu.id} onClick={onMenuClick}>
      {menu.title}
    </li>
  );
});

export default Menu;
