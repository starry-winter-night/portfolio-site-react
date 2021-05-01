import React, { useRef, useEffect } from 'react';
import './app.css';
import Navbar from './components/navbar/navbar';
import Aside from './components/aside/aside';
import Sections from './components/sections/sections';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const App = ({ starryNight }) => {
  const canvasRef = useRef();

  useEffect(() => {
    starryNight.draw(canvasRef.current);
  }, [starryNight]);

  return (
    <>
      <canvas ref={canvasRef} className="canvas"></canvas>
      <Navbar />
      <Aside FontAwesome={FontAwesomeIcon} />
      <Sections FontAwesome={FontAwesomeIcon} />
    </>
  );
};

export default App;
