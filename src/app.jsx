import React, { useCallback, useState } from 'react';
import './app.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Portfolio from './components/portfolio/portfolio';
import Study from './components/study/study';

const App = ({ starryNight, highLightMenu, moveSection, youtube }) => {
  const [studyButtonToggle, setStudyButtonToggle] = useState('off');

  const handleClickStudy = useCallback(() => {
    if (studyButtonToggle === 'off') {
      setStudyButtonToggle('on');
    } else {
      setStudyButtonToggle('off');
    }
  }, [studyButtonToggle]);

  return (
    <>
      <div className={`portfolio ${studyButtonToggle === 'off' && 'view'}`}>
        <Portfolio
          FontAwesome={FontAwesomeIcon}
          starryNight={starryNight}
          highLightMenu={highLightMenu}
          moveSection={moveSection}
          onStudy={handleClickStudy}
        />
      </div>
      <div className={`study ${studyButtonToggle === 'on' && 'view'}`}>
        <Study FontAwesome={FontAwesomeIcon} youtube={youtube} />
      </div>
    </>
  );
};

export default App;
