import React, { useRef, useEffect, useState, useCallback } from 'react';
import './portfolio.css';
import Navbar from './navbar/navbar';
import Aside from './aside/aside';
import Sections from './sections/sections';

const Portfolio = ({
  starryNight,
  highLightMenu,
  moveSection,
  authService,
}) => {
  const [mobileMenuIconToggle, setMobileMenuIconToggle] = useState('off');

  const portfolioRef = useRef();
  const canvasRef = useRef();
  const asideRef = useRef();
  const mainRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;

    starryNight.draw(canvas);

    return () => {
      starryNight.clear(canvas);
    };
  }, [starryNight]);

  const toggleMenu = useCallback((state) => {
    setMobileMenuIconToggle(state);
  }, []);

  const onElementClick = useCallback(
    (e) => {
      if (!e.target.closest('aside')) {
        toggleMenu('off');
      }
    },
    [toggleMenu]
  );

  return (
    <div className="portfolio" ref={portfolioRef} onClick={onElementClick}>
      <canvas ref={canvasRef} className="canvas"></canvas>
      <Navbar portfolioRef={portfolioRef} />
      <aside
        id="aside"
        ref={asideRef}
        onClick={onElementClick}
        className={`aside ${mobileMenuIconToggle === 'on' && 'active'}`}
      >
        <Aside
          authService={authService}
          highLightMenu={highLightMenu}
          moveSection={moveSection}
          mainRef={mainRef}
          portfolioRef={portfolioRef}
          mobileMenuIconToggle={mobileMenuIconToggle}
          toggleMenu={toggleMenu}
        />
      </aside>

      <main ref={mainRef}>
        <Sections />
      </main>
    </div>
  );
};

export default Portfolio;
