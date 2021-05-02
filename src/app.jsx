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

  const menuClickHandler = useCallback(
    (id) => moveSection.start(id, [...sections]),
    [moveSection, sections]
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
        moveSection={menuClickHandler}
        FontAwesome={FontAwesomeIcon}
      />
      <Sections sectionRef={getSectionsRef} FontAwesome={FontAwesomeIcon} />
    </>
  );
};

export default App;
