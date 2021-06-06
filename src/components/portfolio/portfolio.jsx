import React, { useRef, useEffect, useState } from 'react';
import './portfolio.css';
import Navbar from './navbar/navbar';
import Aside from './aside/aside';
import Sections from './sections/sections';

const Portfolio = ({ starryNight, highLightMenu, moveSection }) => {
  const [sections, setSections] = useState([]);
  const [container, setContainer] = useState(null);

  const portfolioRef = useRef();
  const canvasRef = useRef();
  const mainRef = useRef();

  useEffect(() => {
    starryNight.draw(canvasRef.current);

    setSections(mainRef.current.childNodes);
    setContainer(portfolioRef.current);
  }, [starryNight]);

  return (
    <div className="portfolio" ref={portfolioRef}>
      <canvas ref={canvasRef} className="canvas"></canvas>

      {container && <Navbar container={container} />}

      {sections && container && (
        <Aside
          highLightMenu={highLightMenu}
          sections={sections}
          moveSection={moveSection}
          container={container}
        />
      )}

      <main ref={mainRef}>
        <Sections />
      </main>
    </div>
  );
};

export default Portfolio;
