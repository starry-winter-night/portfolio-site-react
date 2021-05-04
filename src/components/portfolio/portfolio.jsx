import React, { useRef, useEffect, useCallback, useState } from 'react';
import './portfolio.css';
import Navbar from './navbar/navbar';
import Aside from './aside/aside';
import Sections from './sections/sections';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Portfolio = ({ starryNight, highLightMenu, moveSection, onStudy }) => {
  const [observe, setObserve] = useState(null);
  const [sections, setSections] = useState([]);

  const canvasRef = useRef();

  useEffect(() => {
    starryNight.draw(canvasRef.current);
  }, [starryNight]);

  useEffect(() => {
    highLightMenu.on([...sections], setObserve);
  }, [highLightMenu, sections]);

  const handleClickMenu = useCallback(
    (id) => moveSection.start(id, [...sections]),
    [moveSection, sections]
  );

  const getSectionsRefs = useCallback((dom) => {
    setSections((item) => [...item, dom]);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="canvas"></canvas>
      <Navbar />
      <Aside
        observe={observe}
        onMenu={handleClickMenu}
        FontAwesome={FontAwesomeIcon}
        onStudy={onStudy}
      />
      <Sections sectionRefs={getSectionsRefs} FontAwesome={FontAwesomeIcon} />
    </>
  );
};

export default Portfolio;
