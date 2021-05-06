import React, { useEffect, useState } from 'react';
import Navbar from './navbar/navbar';
import Sections from './sections/sections';
// import Aside from './aside/aside';
const Study = ({ FontAwesome, youtube }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    youtube.playList().then((result) => setItems(result));
  }, [youtube]);

  return (
    <>
      <Navbar FontAwesome={FontAwesome} /> {}
      {items.length !== 0 && (
        /* <Aside items={items} /> */ <Sections items={items} />
      )}
    </>
  );
};
export default Study;
