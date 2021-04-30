import Navbar from './components/navbar/navbar';
import Aside from './components/aside/aside';
import Home from './components/sections/home';
import About from './components/sections/about';
import './app.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faServer } from '@fortawesome/free-solid-svg-icons';
import { faJsSquare } from '@fortawesome/free-brands-svg-icons';
import React, { useRef, useEffect } from 'react';

const App = ({ starryNight }) => {
  const canvasRef = useRef();

  useEffect(() => {
    starryNight.draw(canvasRef.current);
  }, [starryNight]);

  return (
    <>
      <canvas ref={canvasRef} className="canvas"></canvas>
      <Navbar />
      <Aside FontAwesomeIcon={FontAwesomeIcon} faBars={faBars} />
      <Home />
      <About
        FontAwesomeIcon={FontAwesomeIcon}
        faServer={faServer}
        faJsSquare={faJsSquare}
      />
    </>
  );
};

export default App;
