import React, { useRef, useEffect } from 'react';
import './app.css';
import Navbar from './components/navbar/navbar';
import Aside from './components/aside/aside';
import Sections from './components/sections/sections';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const App = ({ starryNight }) => {
  const canvasRef = useRef();
  const menuRef = useRef([]);

  useEffect(() => {
    starryNight.draw(canvasRef.current);
  }, [starryNight]);

  return (
    <>
      <canvas ref={canvasRef} className="canvas"></canvas>
      <Navbar />
      <Aside menuRef={menuRef} FontAwesome={FontAwesomeIcon} />
      <Sections
        menuRef={(ref) => menuRef.current.push(ref)}
        FontAwesome={FontAwesomeIcon}
      />
    </>
  );
};

export default App;
