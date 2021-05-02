import React, { useRef, useEffect, useCallback, useState } from 'react';
import './app.css';
import Navbar from './components/navbar/navbar';
import Aside from './components/aside/aside';
import Sections from './components/sections/sections';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MoveSection from './service/menuControl/moveMenuSection';
import HighLightMenu from './service/menuControl/highlightMenuList.js';

const App = ({ starryNight }) => {
  const [observe, setObserve] = useState(null);
  const [sections, setSections] = useState([]);
  const canvasRef = useRef();

  useEffect(() => {
    starryNight.draw(canvasRef.current);
  }, [starryNight]);

  useEffect(() => {
    const highlight = new HighLightMenu([...sections]);

    highlight.on(setObserve);
  }, [sections]);

  const moveSection = useCallback(
    (id) => {
      const move = new MoveSection(id, [...sections]);
      move.start();
    },
    [sections]
  );

  const getSectionsRef = useCallback((dom) => {
    setSections((item) => [...item, dom]);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="canvas"></canvas>
      <Navbar />
      <Aside
        observe={observe}
        moveSection={moveSection}
        FontAwesome={FontAwesomeIcon}
      />
      <Sections sectionRef={getSectionsRef} FontAwesome={FontAwesomeIcon} />
    </>
  );
};

export default App;
