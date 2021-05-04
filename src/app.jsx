import React, { useCallback, useState } from 'react';
import './app.css';
import Portfolio from './components/portfolio/portfolio';
import Study from './components/study/study';

const App = ({ starryNight, highLightMenu, moveSection }) => {
  const [toggle, setToggle] = useState('off');

  const handleClickStudy = useCallback(() => {

  }, []);

  return (
    <>
      <div className="portfolio">
        <Portfolio
          starryNight={starryNight}
          highLightMenu={highLightMenu}
          moveSection={moveSection}
        />
      </div>
      <div className="study">
        <Study handleClickStudy={handleClickStudy} />
      </div>
    </>
  );
};

export default App;
