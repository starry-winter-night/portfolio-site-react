import React, { useRef, useEffect, memo } from 'react';
import './portfolio.css';
import Navbar from './navbar/navbar';
import Aside from './aside/aside';
import Sections from './sections/sections';

const Portfolio = memo(
  ({ starryNight, highLightMenu, moveSection, FontAwesome, authService }) => {
    const canvasRef = useRef();
    const sectionsRef = useRef();

    useEffect(() => {
      starryNight.draw(canvasRef.current);
    }, [starryNight]);

    return (
      <>
        <canvas ref={canvasRef} className="canvas"></canvas>
        <Navbar />
        <Aside
          highLightMenu={highLightMenu}
          FontAwesome={FontAwesome}
          authService={authService}
          sectionsRef={sectionsRef}
          moveSection={moveSection}
        />
        <div ref={sectionsRef}>
          <Sections FontAwesome={FontAwesome} />
        </div>
      </>
    );
  }
);

export default Portfolio;
