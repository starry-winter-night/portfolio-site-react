import './app.module.css';
import Navbar from './components/navbar';
import styles from './app.module.css';
import React, { useRef, useEffect } from 'react';

const App = ({ starryNight }) => {
  const canvasRef = useRef();

  useEffect(() => {
    starryNight.draw(canvasRef.current);
  }, [starryNight]);

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
      <Navbar />
    </>
  );
};

export default App;
