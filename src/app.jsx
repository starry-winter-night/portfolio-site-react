import React, { useRef, useEffect, useCallback, useState } from 'react';
import './app.css';
import Navbar from './components/navbar/navbar';
import Aside from './components/aside/aside';
import Sections from './components/sections/sections';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const App = ({ starryNight, highLightMenu, moveSection }) => {
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
        handleClickMenu={handleClickMenu}
        FontAwesome={FontAwesomeIcon}
      />
      <Sections sectionRefs={getSectionsRefs} FontAwesome={FontAwesomeIcon} />
    </>
  );
};

export default App;
