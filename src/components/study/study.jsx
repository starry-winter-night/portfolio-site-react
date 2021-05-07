import React, { useEffect, useState, useCallback } from 'react';
import Navbar from './navbar/navbar';
import Sections from './sections/sections';

const Study = ({ FontAwesome, youtube }) => {
  // 리스트와 컨텐트를 나누자. 

  const [items, setItems] = useState();
  const [menus, setMenu] = useState([
    { id: 'develop', title: 'Develop', view: 'on' },
    { id: 'search', title: 'Search', view: 'off' },
    { id: 'etc', title: 'Etc', view: 'off' },
    { id: 'card', title: 'Card', view: 'off' },
  ]);

  useEffect(() => {
    youtube.developList().then((result) => setItems(result));
  }, [youtube]);

  const handleClickMenu = useCallback(
    (title) => {
      setMenu((menu) =>
        menu.map((item) => {
          if (item.title === title) {
            return { ...item, view: 'on' };
          }

          return { ...item, view: 'off' };
        })
      );
    },
    []
  );

  return (
    <>
      <Navbar
        menus={menus}
        FontAwesome={FontAwesome}
        onMenu={handleClickMenu}
      />
      {items && <Sections items={items} menus={menus} />}
    </>
  );
};
export default Study;
