import React, { useCallback, useState, useEffect } from 'react';
import './app.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Portfolio from './components/portfolio/portfolio';
import Study from './components/study/study';

const App = ({ starryNight, highLightMenu, moveSection, youtube }) => {
  const [studyToggle, setStudyToggle] = useState({
    view: 'off',
    positionY: null,
  });

  const handleClickStudy = useCallback(() => {
    if (studyToggle.view === 'off') {
      setStudyToggle((item) => {
        return { ...item, view: 'on', positionY: window.scrollY };
      });
    } else {
      setStudyToggle((item) => {
        return { ...item, view: 'off' };
      });
    }
  }, [studyToggle]);

  useEffect(() => {
    return () => {
      if (studyToggle.positionY && studyToggle.view === 'on') {
        window.scrollTo({ top: studyToggle.positionY, left: 0 });
      } else {
        window.scrollTo({ top: 0, left: 0 });
      }
    };
  });

  return (
    <>
      <div className={`portfolio ${studyToggle.view === 'off' && 'view'}`}>
        <Portfolio
          FontAwesome={FontAwesomeIcon}
          starryNight={starryNight}
          highLightMenu={highLightMenu}
          moveSection={moveSection}
          onStudy={handleClickStudy}
        />
      </div>
      <div className={`study ${studyToggle.view === 'on' && 'view'}`}>
        <Study
          FontAwesome={FontAwesomeIcon}
          youtube={youtube}
          onStudy={handleClickStudy}
        />
      </div>
    </>
  );
};

export default App;
