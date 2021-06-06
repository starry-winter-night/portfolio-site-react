import React, { useRef, useEffect } from 'react';
import './portfolio.css';
import Navbar from './navbar/navbar';
import Aside from './aside/aside';
import Sections from './sections/sections';

const Portfolio = ({ starryNight, highLightMenu, moveSection }) => {
  const portfolioRef = useRef();
  const canvasRef = useRef();
  const mainRef = useRef();

  useEffect(() => {
    starryNight.draw(canvasRef.current);
  }, [starryNight]);

  return (
    <div className="portfolio" ref={portfolioRef}>
      <canvas ref={canvasRef} className="canvas"></canvas>
      <Navbar portfolioRef={portfolioRef} />
      <Aside
        highLightMenu={highLightMenu}
        mainRef={mainRef}
        moveSection={moveSection}
        portfolioRef={portfolioRef}
      />
      <main ref={mainRef}>
        <Sections />
      </main>
    </div>
  );
};

export default Portfolio;
