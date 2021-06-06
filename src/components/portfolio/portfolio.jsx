import React, { useRef, useEffect, useState, memo, useCallback } from 'react';
import './portfolio.css';
import Navbar from './navbar/navbar';
import Aside from './aside/aside';
import Sections from './sections/sections';

const Portfolio = memo(({ starryNight, highLightMenu, moveSection }) => {
  const [sections, setSections] = useState([]);

  const portfolioRef = useRef();
  const canvasRef = useRef();
  const mainRef = useRef();

  useEffect(() => {
    starryNight.draw(canvasRef.current);

    const sectionsRef = mainRef.current.childNodes;

    for (let i = 0; i < sectionsRef.length; i++) {
      setSections((item) => [...item, sectionsRef[i]]);
    }
  }, [starryNight]);

  const onMenuClick = useCallback(
    (id) => {
      moveSection.start(id, [...sections], portfolioRef.current);
    },
    [moveSection, sections]
  );

  return (
    <div className="portfolio" ref={portfolioRef}>
      <canvas ref={canvasRef} className="canvas"></canvas>
      <Navbar portfolioRef={portfolioRef} />
      <Aside
        highLightMenu={highLightMenu}
        onMenuClick={onMenuClick}
        moveSection={moveSection}
        sections={sections}
      />
      <main ref={mainRef}>
        <Sections />
      </main>
    </div>
  );
});

export default Portfolio;
