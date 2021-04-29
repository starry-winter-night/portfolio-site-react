import './app.module.css';
import Navbar from './components/site_navbar/navbar';
import Aside from './components/site_aside/aside';
import styles from './app.module.css';
import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const App = ({ starryNight }) => {
  const canvasRef = useRef();

  useEffect(() => {
    starryNight.draw(canvasRef.current);
  }, [starryNight]);

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
      <Navbar />
      <Aside FontAwesomeIcon={FontAwesomeIcon} faBars={faBars} />
    </>
  );
};

export default App;
