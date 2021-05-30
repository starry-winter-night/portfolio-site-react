import React, { useRef, useEffect, memo } from 'react';
import './portfolio.css';
import Navbar from './navbar/navbar';
import Aside from './aside/aside';
import Sections from './sections/sections';

const Portfolio = memo(
  ({ starryNight, highLightMenu, moveSection, auth }) => {
    const portfolioRef = useRef();
    const canvasRef = useRef();
    const sectionsRef = useRef();

    useEffect(() => {
      starryNight.draw(canvasRef.current);
    }, [starryNight]);

    return (
      <div className="portfolio" ref={portfolioRef}>
        <canvas ref={canvasRef} className="canvas"></canvas>
        <Navbar portfolioRef={portfolioRef} />
        <Aside
          highLightMenu={highLightMenu}
          sectionsRef={sectionsRef}
          portfolioRef={portfolioRef}
          moveSection={moveSection}
          auth={auth}
        />
        <main ref={sectionsRef}>
          <Sections />
        </main>
      </div>
    );
  }
);

export default Portfolio;
