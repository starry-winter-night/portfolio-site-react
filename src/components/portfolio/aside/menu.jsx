import React, { memo } from 'react';

const Menu = memo(({ menu, effect, onMenu }) => {
  const handleClickMenu = (e) => {
    onMenu(e.target.dataset.id);
  };

  return (
    <li className={effect} data-id={menu.id} onClick={handleClickMenu}>
      {menu.title}
    </li>
  );
});

export default Menu;
